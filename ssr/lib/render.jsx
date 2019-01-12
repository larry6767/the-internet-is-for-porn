import {find, includes} from 'lodash'
import React from 'react'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router'
import {renderToString} from 'react-dom/server'
import Immutable from 'immutable'
import {ServerStyleSheet} from 'styled-components'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName} from '@material-ui/core/styles'

import {plainProvedGet as g, immutableProvedGet as ig} from '../App/helpers'
import {buildLocalePageCodes, logRequestError} from './helpers'
import {getPageData as requestPageData} from './requests'
import {proxiedHeaders} from './backend-proxy'
import RouterBuilder from '../router-builder'
import {App} from '../App'
import appActions from '../App/actions'
import languageActions from '../App/MainHeader/Language/actions'
import routerLocales from '../router-locale-mapping'

const getPageData =
    (req, siteLocales, localeCode) => etc =>
        requestPageData(siteLocales, localeCode)({
            headers: proxiedHeaders(siteLocales, localeCode)(req),
            ...etc
        })

// renders a page and makes a proper response for express.js
export default (
    siteLocales,
    defaultSiteLocaleCode,
    {pre, post} // <- pre-bound layout template object
) => async (req, res, store) => {
    try {
        const
            domain = req.get('host').replace(/:[0-9]+$/, ''),
            isLocalhost = includes(['localhost', '127.0.0.1'], domain),

            locale = isLocalhost
                ? find(siteLocales, x => g(x, 'code') === defaultSiteLocaleCode)
                : find(siteLocales, x => g(x, 'host') === domain),

            localeCode = g(locale, 'code')

        if ( ! locale)
            throw new Error(`Site locale not found for this host: ${req.get('host')}`)

        store.dispatch(appActions.setLocaleCode(localeCode))
        store.dispatch(appActions.fillLocalePageCodes(buildLocalePageCodes(localeCode)))
        store.dispatch(appActions.fillLocaleRouter(g(routerLocales, localeCode)))
        store.dispatch(languageActions.setNewLanguage(localeCode))

        const
            staticRouterContext = {isPreRouting: true},
            state = store.getState(),
            location = ig(state, 'router', 'location'),
            router = ig(state, 'app', 'locale', 'router')

        // just filling `staticRouterContext` with meta info,
        // not really rendering anything.
        renderToString(
            <StaticRouter location={req.url} context={staticRouterContext}>
                <RouterBuilder location={location} router={router}/>
            </StaticRouter>
        )

        if (staticRouterContext.saga) {
            await new Promise((resolve, reject) => {
                try {
                    store.runSaga(function* () {
                        try {
                            const ssrContext = {
                                getPageData: getPageData(req, siteLocales, localeCode),
                            }

                            yield [staticRouterContext.saga(ssrContext)]
                            resolve()
                        } catch (e) {reject(e)}
                    })
                } catch (e) {reject(e)}
            })
        }

        if (staticRouterContext.statusCodeResolver)
            res.status(staticRouterContext.statusCodeResolver(store.getState()))

        if (staticRouterContext.url) {
            res.writeHead(302, {'Location': staticRouterContext.url})
            return res.end()
        }

        const
            serverStyleSheet = new ServerStyleSheet(),
            jssSheetsRegistry = new SheetsRegistry(),
            generateClassName = createGenerateClassName(),
            sheetsManager = new Map(), // is needed to fix styles not rendered after page reload

            html = renderToString(serverStyleSheet.collectStyles(
                <JssProvider registry={jssSheetsRegistry} generateClassName={generateClassName}>
                    <Provider store={store}>
                        <StaticRouter location={req.url} context={{}}>
                            <App sheetsManager={sheetsManager} location={location} router={router}>
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

        return res.end(`${pre}
            ${html}
            ${styledComponentsStyles}
            ${jssStyles}
            ${storePresetHtml}
        ${post}`)
    } catch (e) {
        res.status(500).end('Internal Server Error')
        logRequestError(req)(e)
    }
}
