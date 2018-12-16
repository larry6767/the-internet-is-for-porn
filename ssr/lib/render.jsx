import React from 'react'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router'
import {renderToString} from 'react-dom/server'
import Immutable from 'immutable'
import {ServerStyleSheet} from 'styled-components'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName} from '@material-ui/core/styles'

import {getPageData as requestPageData} from './requests'
import {proxiedHeaders} from './backend-proxy'
import RouterBuilder from '../router-builder'
import {App} from '../App'

const getPageData = req => etc => requestPageData({headers: proxiedHeaders(req), ...etc})

// renders a page and makes a proper response for express.js
export default
    ({pre, post}) => // <- pre-bound layout template object
    async (req, res, store) => {
        try {
            const
                staticRouterContext = {isPreRouting: true},
                state = store.getState(),
                location = state.getIn(['router', 'location'])

            // just filling `staticRouterContext` with meta info,
            // not really rendering anything.
            renderToString(
                <StaticRouter location={req.url} context={staticRouterContext}>
                    <RouterBuilder location={location}/>
                </StaticRouter>
            )

            if (staticRouterContext.saga) {
                await new Promise((resolve, reject) => {
                    try {
                        store.runSaga(function* () {
                            try {
                                const ssrContext = {getPageData: getPageData(req)}
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
                                <App sheetsManager={sheetsManager} location={location}>
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
            throw e
        }
    }
