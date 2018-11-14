import {readFileSync} from 'fs'
import {join} from 'path'
import stream from 'stream'
import url from 'url'
import {set} from 'lodash'
import React from 'react'
import yargs from 'yargs'
import express from 'express'
import favicon from 'serve-favicon'
import {fromJS} from 'immutable'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {ServerStyleSheet} from 'styled-components'
import {SheetsRegistry} from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName} from '@material-ui/core/styles'
import {renderToNodeStream} from 'react-dom/server'
import createRootReducer from '../src/reducers.js'
import {App} from '../src/App'
import Home from '../src/App/Home'
import AllNiches from '../src/App/AllNiches'
import AllMovies from '../src/App/AllMovies'
import Pornstars from '../src/App/Pornstars'
import NotFound from '../src/App/NotFound'


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

    initialStoreOnUrl = reqUrl =>
        initialStore.updateIn(['router', 'location'], x => {
            const {pathname, search, hash} = url.parse(reqUrl)
            return x.merge({pathname: pathname || '', search: search || '', hash: hash || ''})
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
    },

    routeMapping = {
        '/': mkHandlers('get', [
            (req, res, next) =>
                req.url === '/?categories'
                    ? res.redirect('/all-niches')
                    : next(),

            (req, res) => renderComponent(res, <Home/>, newStore(initialStoreOnUrl(req.url))),
        ]),

        '/all-niches': mkHandler('get', (req, res) =>
            renderComponent(res, <AllNiches/>, newStore(initialStoreOnUrl(req.url)))
        ),

        '/all-movies.html': mkHandler('get', (req, res) => res.redirect('/all-movies')),
        '/all-movies': mkHandler('get', (req, res) =>
            renderComponent(res, <AllMovies/>, newStore(initialStoreOnUrl(req.url)))
        ),

        '/porn-stars.html': mkHandler('get', (req, res) => res.redirect('/pornstars')),
        '/pornstars': mkHandler('get', (req, res) =>
            renderComponent(res, <Pornstars/>, newStore(initialStoreOnUrl(req.url)))
        ),

        '*': mkHandler('get', (req, res) => {
            res.status(404)
            renderComponent(res, <NotFound/>, newStore(initialStoreOnUrl(req.url)))
        }),
    }

app.use(favicon(join(publicDir, 'favicon.ico')))
app.use('/img', express.static(join(publicDir, 'img')))
app.get('/manifest.json', (req, res) => res.sendFile(join(publicDir, '/manifest.json')))

// boilerplate to add express.js handlers by iterating `routeMapping`
for (const route of Object.keys(routeMapping)) {
    const x = routeMapping[route]

    if (Array.isArray(x)) {
        for (const { method, handler } of x)
            app[method](route, handler)
    } else if (x !== null && typeof x === 'object') {
        app[x.method](route, x.handler)
    } else {
        throw new Error(
            `Unexpected mapped route ("${route}") handler type: ${typeof x}`)
    }
}

app.listen(port, host, () => {
    console.debug(`Start listening HTTP-server on http://${host}:${port}...`)
})
