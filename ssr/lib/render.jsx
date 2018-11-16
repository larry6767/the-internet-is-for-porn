import React from 'react'
import {Provider} from 'react-redux'
import {ServerStyleSheet} from 'styled-components'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName} from '@material-ui/core/styles'
import {renderToNodeStream} from 'react-dom/server'

import {App} from '../../src/App'


// renders a component to a stream of a server `response` object
export const renderComponent =
    ({pre, post}) => // <- pre-bound layout template object
    (res, childComponent, store) =>
    new Promise((resolve, reject) => {
        res.write(pre)

        const
            serverStyleSheet = new ServerStyleSheet(),
            jssSheetsRegistry = new SheetsRegistry(),
            generateClassName = createGenerateClassName(),
            sheetsManager = new Map(), // is needed to fix styles not rendered after page reload

            jsx = serverStyleSheet.collectStyles(<Provider store={store}>
                <JssProvider registry={jssSheetsRegistry} generateClassName={generateClassName}>
                    <App sheetsManager={sheetsManager}>{() => childComponent}</App>
                </JssProvider>
            </Provider>)

        serverStyleSheet
            .interleaveWithNodeStream(renderToNodeStream(jsx))
            .on('error', err => reject(err))
            .on('end', () => {
                try {
                    res.write('<style id="jss-server-side">')

                    for (const styleSheet of jssSheetsRegistry.registry)
                        if (styleSheet.attached)
                            res.write(`${styleSheet}\n`)

                    res.write('</style>')

                    res.end(post)
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })
            .pipe(res, {end: false})
            .on('error', err => reject(err))
    })
