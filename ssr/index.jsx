import {join} from 'path'
import React from 'react'
import yargs from 'yargs'
import express from 'express'
import favicon from 'serve-favicon'

import {routeMapping} from './lib/routes'


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
    app = express()

app.use(favicon(join(publicDir, 'favicon.ico')))
app.use('/img', express.static(join(publicDir, 'img')))
app.get('/manifest.json', (req, res) => res.sendFile(join(publicDir, '/manifest.json')))

// boilerplate to add express.js handlers by iterating `routeMapping`
for (const route of Object.keys(routeMapping)) {
    const x = routeMapping[route]

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
    console.debug(`Start listening HTTP-server on http://${host}:${port}...`)
})
