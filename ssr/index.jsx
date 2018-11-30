import {join} from 'path'
import {readFileSync} from 'fs'

import React from 'react'
import yargs from 'yargs'
import express from 'express'
import favicon from 'serve-favicon'
import {json} from 'body-parser'

import {renderComponent} from './lib/render'
import {routeMapping} from './lib/routes'
import backendProxyHandler from './lib/backend-proxy'


const
    {port, host, production: isProduction, rc: isRC} = yargs
        .option('port', {
            description: 'Port to start listening HTTP-server on',
            default: 8001,
        })
        .option('host', {
            description: 'Host for HTTP-server',
            default: '127.0.0.1',
        })
        .option('production', {
            description: 'Run in production mode (will use production build)',
            default: false,
        })
        .option('rc', {
            description: 'Running testing server (will use proper robots.txt file)',
            default: false,
        })
        .argv,

    publicDir = isProduction
        ? join(__dirname, '..', 'build')
        : join(__dirname, '..', 'public'),

    robotsTxtFilePath =
        join(__dirname, '..', 'robots', (isRC ? 'rc' : 'production'), 'robots.txt'),

    render = renderComponent((result => ({
        pre: `${result[0]}<div id="root">`,
        post: `</div>${result[1]}`,
    }))(
        readFileSync(join(publicDir, 'index.html'))
            .toString()
            .replace(/%PUBLIC_URL%/g, '')
            .split('<div id="root"></div>')
    )),

    routes = routeMapping(render),
    app = express()

app.use(favicon(join(publicDir, 'favicon.ico')))
app.use('/img', express.static(join(publicDir, 'img')))

if (isProduction)
    app.use('/static/js', express.static(join(publicDir, 'static', 'js')))

app.get('/manifest.json', (req, res) => res.sendFile(join(publicDir, '/manifest.json')))
app.get('/robots.txt', (req, res) => res.sendFile(robotsTxtFilePath))

app.use('/backend-proxy/:operation', json(), backendProxyHandler)

// boilerplate to add express.js handlers by iterating `routeMapping`
for (const [route, x] of routes) {
    if (Array.isArray(x)) {
        for (const {method, handler} of x)
            app[method](route, handler)
    } else if (x !== null && typeof x === 'object') {
        app[x.method](route, x.handler)
    } else {
        throw new Error(
            `Unexpected mapped route ("${route}") handler type: ${typeof x}`)
    }
}

app.listen(port, host, () => {
    if (isProduction) console.info('Running in production mode...')
    if (isRC) console.info('Running Release Candidate server...')
    console.debug(`Start listening HTTP-server on http://${host}:${port}...`)
})
