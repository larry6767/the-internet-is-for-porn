import React from 'react'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router'
import {renderToString} from 'react-dom/server'
import Immutable from 'immutable'
import {ServerStyleSheet} from 'styled-components'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName} from '@material-ui/core/styles'

import RouterBuilder from '../router-builder'
import {App} from '../../src/App'


// renders a page and makes a proper response for express.js
export default
    ({pre, post}) => // <- pre-bound layout template object
    async (res, reqUrl, store) => {
        try {
            const
                context = {},
                location = store.getState().getIn(['router', 'location']),
                serverStyleSheet = new ServerStyleSheet(),
                jssSheetsRegistry = new SheetsRegistry(),
                generateClassName = createGenerateClassName(),
                sheetsManager = new Map(), // is needed to fix styles not rendered after page reload

                html = renderToString(serverStyleSheet.collectStyles(
                    <JssProvider registry={jssSheetsRegistry} generateClassName={generateClassName}>
                        <Provider store={store}>
                            <StaticRouter location={reqUrl} context={context}>
                                <App sheetsManager={sheetsManager} location={location}>
                                    {RouterBuilder}
                                </App>
                            </StaticRouter>
                        </Provider>
                    </JssProvider>
                ))

            if (context.status === 404) {
                res.status(404);
            } else if (context.url) {
                res.writeHead(302, {'Location': context.url})
                return res.end()
            }

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
