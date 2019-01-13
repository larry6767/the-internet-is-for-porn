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
import {plainProvedGet as g} from './App/helpers'
import {deepFreeze} from './lib/helpers'
import renderPage from './lib/render'
import {newStore} from './lib/store'
import backendProxyHandler from './lib/backend-proxy'
import {getSiteLocales} from './lib/requests'
import {validate as apiLocaleMappingValidate} from './locale-mapping/backend-api'
import {validate as routerLocaleMappingValidate} from './locale-mapping/router'
import {validate as i18nLocaleMappingValidate} from './locale-mapping/i18n'

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
        .argv

const initApp = async () => {
    const
        {locales: siteLocales, defaultLocaleCode: defaultSiteLocaleCode} = await getSiteLocales()

    deepFreeze(siteLocales)

    const
        publicDir = isProduction
            ? join(__dirname, '..', 'build')
            : join(__dirname, '..', 'public'),

        robotsTxtFilePath =
            join(__dirname, '..', 'robots', (isRC ? 'rc' : 'production'), 'robots.txt'),

        render = renderPage(siteLocales, defaultSiteLocaleCode, (result => ({
            pre: `${result[0]}<div id="root">`,
            post: `</div>${result[1]}`,
        }))(
            readFileSync(join(publicDir, 'index.html'))
                .toString()
                .replace(/%PUBLIC_URL%/g, '')
                .split('<div id="root"></div>')
        )),

        app = express()

    apiLocaleMappingValidate(siteLocales)
    routerLocaleMappingValidate(siteLocales)
    i18nLocaleMappingValidate(siteLocales)

    // it's recommended to serve these files by nginx as static files
    app.use(favicon(join(publicDir, 'favicon.ico')))
    app.get('/robots.txt', (req, res) => res.sendFile(robotsTxtFilePath))
    app.get('/manifest.json', (req, res) => res.sendFile(join(publicDir, '/manifest.json')))
    app.use('/img', express.static(join(publicDir, 'img')))
    if (isProduction) app.use('/static/js', express.static(join(publicDir, 'static', 'js')))

    app.use(
        '/backend-proxy/:operation',
        json(),
        backendProxyHandler(siteLocales, defaultSiteLocaleCode)
    )

    app.use((req, res) => render(req, res, newStore(siteLocales, g(req, 'url'))))

    app.listen(port, host, () => {
        if (isProduction) console.info('Running in production mode...')
        if (isRC) console.info('Running Release Candidate server...')
        console.debug(`Start listening HTTP-server on http://${host}:${port}...`)
    })
}

initApp().catch(err => {
    console.error('The app is failed with exception:', err)
    process.exit(1)
})
