import {readFileSync} from 'fs'
import {join} from 'path'
import stream from 'stream'
import {set} from 'lodash'
import React from 'react'
import yargs from 'yargs'
import express from 'express'
import favicon from 'serve-favicon'
import {fromJS} from 'immutable'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {ServerStyleSheet} from 'styled-components'
import {renderToNodeStream} from 'react-dom/server'
import createRootReducer from '../src/reducers.js'
import {App} from '../src/App'
import {Home} from '../src/App/Home'

const
    {port, host} = yargs
        .option('port', {
            description: 'Port to start listening HTTP-server on',
            default: 8001,
        })
        .option('host', {
            description: 'Host for HTTP-server',
            default: '127.0.0.1',
        })
        .argv,

    publicDir = join(__dirname, '..', 'public'),
    app = express(),
    allowedMethods = ['get'],

    // boilerplate to create handlers for route mapping
    mkHandler = (method, handler) => {
        if (allowedMethods.indexOf(method) === -1)
            throw new Error(`Unexpected method: "${method.toUpperCase()}"`)

        return { method, handler }
    },

    // boilerplate to create handlers for route mapping
    mkHandlers = (method, handlers) =>
        handlers.map(handler => mkHandler(method, handler)),

    initialStore = fromJS({
        router: {
            location: {
                hash: '',
                pathname: '/',
                search: '',
            }
        }
    }),

    reducersPatch = reducers => set(reducers, 'router', x => x),
    newStore = initialStore => createStore(createRootReducer(reducersPatch), initialStore),

    layoutTemplate = (result => ({
        pre: `${result[0]}<div id="root">`,
        post: `</div>${result[1]}`,
    }))(
        readFileSync(join(publicDir, 'index.html'))
            .toString()
            .replace(/%PUBLIC_URL%/g, '')
            .split('<div id="root"></div>')
    ),

    // renders a component to a stream of a server `response` object
    renderComponent = (res, childComponent, store) => {
        res.write(layoutTemplate.pre);

        const
            sheet = new ServerStyleSheet(),

            jsx = sheet.collectStyles(<Provider store={store}>
                <App>{() => childComponent}</App>
            </Provider>)

        sheet
            .interleaveWithNodeStream(renderToNodeStream(jsx))
            .pipe(res, {end: false})
            .on('end', () => res.end(layoutTemplate.post))
    },

    routeMapping = {
        '/': mkHandlers('get', [
            (req, res, next) =>
                req.url === '/?categories'
                    ? res.redirect('/all-niches')
                    : next(),

            (req, res) => renderComponent(res, <Home/>, newStore(initialStore)),
        ]),
    }

// boilerplate to add express.js handlers by iterating `routeMapping`
for (const route of Object.keys(routeMapping)) {
    const x = routeMapping[route]

    if (Array.isArray(x)) {
        for (const { method, handler } of x)
            app[method](route, handler)
    } else if (x !== null && typeof x === 'object') {
        app[method](x.route, x.handler)
    } else {
        throw new Error(
            `Unexpected mapped route ("${route}") handler type: ${typeof x}`)
    }
}

app.use(favicon(join(publicDir, 'favicon.ico')))
app.use('/img', express.static(join(publicDir, 'img')))
app.get('/manifest.json', (req, res) => res.sendFile(join(publicDir, '/manifest.json')))

app.listen(port, host, () => {
    console.debug(`Start listening HTTP-server on http://${host}:${port}...`)
})
