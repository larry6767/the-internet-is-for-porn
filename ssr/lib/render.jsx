import {parse, format} from 'url'
import {find, includes} from 'lodash'
import React from 'react'
import {Provider} from 'react-redux'
import {all} from 'redux-saga/effects'
import {StaticRouter} from 'react-router'
import {renderToString} from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName} from '@material-ui/core/styles'

import {
    plainProvedGet as g,
    getRouterContext,
    getPageTextToHeadTags,
    getOpenGraphToHeadTags,
    PropTypes,
    assertPropTypes,
} from '../App/helpers'

import {getPureDomain} from '../App/helpers/hostLocale'
import {getLegacyOrientationPrefixes, logRequestError} from './helpers'
import {getPageData as requestPageData} from './requests'
import {proxiedHeaders} from './backend-proxy'
import LegacyRedirectsRouterBuilder from './legacy-redirects'
import RouterBuilder from '../router-builder'
import {App} from '../App'
import appActions from '../App/actions'
import languageActions from '../App/MainHeader/Language/actions'
import navigationActions from '../App/MainHeader/Navigation/actions'
import orientationActions from '../App/MainHeader/Niche/actions'
import backRouterLocaleMapping, {frontRouterLocaleMapping} from '../locale-mapping/router'
import i18n from '../locale-mapping/i18n'

const
    getPageData =
        (req, siteLocales) => params =>
            requestPageData(siteLocales)({
                headers: proxiedHeaders(siteLocales, g(params, 'localeCode'))(req),
                ...params
            }),

    // to fix redirects with unicode symbols
    escapeURL = url => {
        const x = parse(url)
        x.pathname = x.pathname.split(/\//).map(x => encodeURIComponent(x)).join('/')
        return format(x)
    },

    preRoutingStaticRouterContextModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.oneOfType([
            PropTypes.exact({
                isPreRouting: PropTypes.bool,
                url: PropTypes.string,
            }),

            PropTypes.exact({
                isPreRouting: PropTypes.bool,
                currentSection: PropTypes.nullable(PropTypes.string),
                currentOrientation: PropTypes.string.isOptional,
                saga: PropTypes.func.isOptional,
                statusCodeResolver: PropTypes.func.isOptional,
                pageTextResolver: PropTypes.func,
                openGraphDataResolver: PropTypes.func.isOptional,
            }),
        ])

// renders a page and makes a proper response for express.js
export default (
    siteLocales,
    defaultSiteLocaleCode,
    layout, // <- pre-bound layout template object
) => async (req, res, store) => {
    try {
        const
            // see also ssr/lib/backend-proxy (getting site locales)
            domain = getPureDomain(req.get('host')),
            isLocalhost = includes(['localhost', '127.0.0.1'], domain),

            locale = isLocalhost
                ? find(siteLocales, x => g(x, 'code') === defaultSiteLocaleCode)
                : find(siteLocales, x => g(x, 'host') === domain),

            localeCode = g(locale, 'code')

        if ( ! locale)
            throw new Error(`Site locale not found for this host: ${req.get('host')}`)

        // WARNING! see also `src/index` to keep this up to date
        store.dispatch(appActions.setLocaleCode(localeCode))
        store.dispatch(appActions.fillLocaleRouter(g(frontRouterLocaleMapping, localeCode)))
        store.dispatch(appActions.fillLocaleI18n(g(i18n, localeCode)))
        store.dispatch(languageActions.setNewLanguage(localeCode))

        {
            const
                state = store.getState(),
                staticLegacyRedirectsRouterContext = {},

                redirectsRouterContext = getRouterContext(
                    state,
                    g(backRouterLocaleMapping, localeCode),
                    getLegacyOrientationPrefixes(localeCode)
                )

            // just to obtain redirect and
            renderToString(
                <StaticRouter location={g(req, 'url')} context={staticLegacyRedirectsRouterContext}>
                    <LegacyRedirectsRouterBuilder routerContext={redirectsRouterContext}/>
                </StaticRouter>
            )

            if (staticLegacyRedirectsRouterContext.hasOwnProperty('url')) {
                const url = g(escapeURL(g(staticLegacyRedirectsRouterContext, 'url')), [])
                res.writeHead(302, {'Location': url})
                return res.end()
            }
        }

        const
            staticRouterContext = {isPreRouting: true}

        // just filling `staticRouterContext` with meta info,
        // not really rendering anything.
        renderToString(
            <StaticRouter location={g(req, 'url')} context={staticRouterContext}>
                <RouterBuilder routerContext={getRouterContext(store.getState())}/>
            </StaticRouter>
        )

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                preRoutingStaticRouterContextModel,
                staticRouterContext,
                'ssr/lib/render',
                'pre routing staticRouterContext'
            )

        if (staticRouterContext.hasOwnProperty('url')) {
            const url = g(escapeURL(g(staticRouterContext, 'url')), [])
            res.writeHead(302, {'Location': url})
            return res.end()
        }

        if (staticRouterContext.hasOwnProperty('currentSection'))
            store.dispatch(navigationActions.setCurrentSection(
                g(staticRouterContext, 'currentSection')
            ))

        if (staticRouterContext.hasOwnProperty('currentOrientation'))
            store.dispatch(orientationActions.switchOrientation(
                g(staticRouterContext, 'currentOrientation')
            ))

        if (staticRouterContext.hasOwnProperty('saga')) {
            await new Promise((resolve, reject) => {
                try {
                    store.runSaga(function* () {
                        try {
                            const ssrContext = {getPageData: getPageData(req, siteLocales)}
                            yield all([staticRouterContext.saga(ssrContext)])
                            resolve()
                        } catch (e) {reject(e)}
                    })
                } catch (e) {reject(e)}
            })
        }

        if (staticRouterContext.hasOwnProperty('statusCodeResolver'))
            res.status(staticRouterContext.statusCodeResolver(store.getState()))

        const
            pageText = staticRouterContext.pageTextResolver(store.getState())

        let
            headTags = getPageTextToHeadTags(pageText).map(x => renderToString(x)).join('\n')

        if (staticRouterContext.hasOwnProperty('openGraphDataResolver')) {
            const
                openGraphData = staticRouterContext.openGraphDataResolver(store.getState()),
                openGraphTags = getOpenGraphToHeadTags(openGraphData).map(x =>
                    renderToString(x)).join('\n')

            headTags = headTags + openGraphTags
        }

        const
            serverStyleSheet = new ServerStyleSheet(),
            jssSheetsRegistry = new SheetsRegistry(),
            generateClassName = createGenerateClassName(),
            sheetsManager = new Map(), // is needed to fix styles not rendered after page reload

            html = renderToString(serverStyleSheet.collectStyles(
                <JssProvider registry={jssSheetsRegistry} generateClassName={generateClassName}>
                    <Provider store={store}>
                        <StaticRouter location={g(req, 'url')} context={{}}>
                            <App
                                sheetsManager={sheetsManager}
                                routerContext={getRouterContext(store.getState())}
                            >
                                {RouterBuilder}
                            </App>
                        </StaticRouter>
                    </Provider>
                </JssProvider>
            ))

        const
            styledComponentsStyles = serverStyleSheet.getStyleTags(),

            jssStyles = `<style id="jss-server-side">
                ${jssSheetsRegistry.registry.filter(x => x.attached).join('\n')}
            </style>`,

            storePresetHtml = `<script>
                window.storePreset = ${JSON.stringify(
                    store.getState().setIn(['app', 'ssr', 'isSSR'], false).toJS()
                )}
            </script>`

        return res.end(`${g(layout, 'pre')}
            ${headTags}
            ${g(layout, 'middle')}
            ${styledComponentsStyles}
            ${jssStyles}
            ${html}
            ${storePresetHtml}
        ${g(layout, 'post')}`)
    } catch (e) {
        res.status(500).end('Internal Server Error')
        logRequestError(req)(e)
    }
}
