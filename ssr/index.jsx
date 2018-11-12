import React from 'react'
import yargs from 'yargs'
import express from 'express'
import {renderToString} from 'react-dom/server'

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

    routeMapping = {
        '/': mkHandlers('get', [
            (req, res, next) =>
                req.url === '/?categories'
                    ? res.redirect('/all-niches')
                    : next(),

            (req, res) => res.end(renderToString(<div>TODO...</div>)),
        ]),
    }

// boilerplate to add express.js handlers by iterating `routeMapping`
for (const route of Object.keys(routeMapping)) {
    const x = routeMapping[route]

    if (Array.isArray(x)) {
        for (const { method, handler } of x)
            app[method](route, handler)
    } else {
        throw new Error(
            `Unexpected mapped route ("${route}") handler type: ${typeof x}`)
    }
}

app.listen(port, host, () => {
    console.debug(`Start listening HTTP-server on http://${host}:${port}...`)
})
