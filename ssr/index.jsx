// node.js built-in libs
import {join} from 'path'
import {readFileSync} from 'fs'

// npm node.js libs
import yargs from 'yargs'
import express from 'express'
import favicon from 'serve-favicon'
import {json} from 'body-parser'

// react and jsx stuff
import React from 'react'
import Router from 'react-router'

// local libs
import renderPage from './lib/render'
import {newStore} from './lib/store'
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

    render = renderPage((result => ({
        pre: `${result[0]}<div id="root">`,
        post: `</div>${result[1]}`,
    }))(
        readFileSync(join(publicDir, 'index.html'))
            .toString()
            .replace(/%PUBLIC_URL%/g, '')
            .split('<div id="root"></div>')
    )),

    app = express()

// it's recommended to serve these files by nginx as static files
app.use(favicon(join(publicDir, 'favicon.ico')))
app.get('/robots.txt', (req, res) => res.sendFile(robotsTxtFilePath))
app.get('/manifest.json', (req, res) => res.sendFile(join(publicDir, '/manifest.json')))
app.use('/img', express.static(join(publicDir, 'img')))
if (isProduction) app.use('/static/js', express.static(join(publicDir, 'static', 'js')))

app.use('/backend-proxy/:operation', json(), backendProxyHandler)

app.use((req, res) => render(res, req.url, newStore(req.url)))

app.listen(port, host, () => {
    if (isProduction) console.info('Running in production mode...')
    if (isRC) console.info('Running Release Candidate server...')
    console.debug(`Start listening HTTP-server on http://${host}:${port}...`)
})
