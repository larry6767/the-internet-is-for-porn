import React from 'react'
import {readFileSync} from 'fs'
import {join} from 'path'

import {Provider} from 'react-redux'
import {ServerStyleSheet} from 'styled-components'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName} from '@material-ui/core/styles'
import {renderToNodeStream} from 'react-dom/server'

import {App} from '../../src/App'


const
    publicDir = join(__dirname, '..', '..', 'public'),

    layoutTemplate = (result => ({
        pre: `${result[0]}<div id="root">`,
        post: `</div>${result[1]}`,
    }))(
        readFileSync(join(publicDir, 'index.html'))
            .toString()
            .replace(/%PUBLIC_URL%/g, '')
            .split('<div id="root"></div>')
    )

// renders a component to a stream of a server `response` object
export const renderComponent = (res, childComponent, store) => {
    res.write(layoutTemplate.pre)

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
        .on('end', () => {
            res.write('<style id="jss-server-side">')

            for (const styleSheet of jssSheetsRegistry.registry)
                if (styleSheet.attached)
                    res.write(`${styleSheet}\n`)

            res.write('</style>')

            res.end(layoutTemplate.post)
        })
        .pipe(res, {end: false})
}
