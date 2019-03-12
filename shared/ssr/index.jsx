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

// local libs
import {plainProvedGet as g, PropTypes, assertPropTypes} from 'App/helpers'
import {patchSiteLocales} from 'App/helpers/hostLocale'
import {deepFreeze} from 'lib/helpers'
import renderPage from 'lib/render'
import {newStore} from 'lib/store'
import backendProxyHandler from 'lib/backend-proxy'
import {getSiteLocales} from 'lib/requests'
import {validate as apiLocaleMappingValidate} from 'locale-mapping/backend-api'
import {validate as routerLocaleMappingValidate} from 'locale-mapping/router'
import {validate as i18nLocaleMappingValidate} from 'locale-mapping/i18n'

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

    layoutModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        pre: PropTypes.exact({
            beforeHtmlAttrs: PropTypes.string,
            afterHtmlAttrs: PropTypes.string,
        }),
        middle: PropTypes.exact({
            beforeBodyAttrs: PropTypes.string,
            afterBodyAttrs: PropTypes.string,
        }),
        post: PropTypes.string,
    }),

    attrsSplitModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.tuple([PropTypes.string, PropTypes.string])

const initApp = async () => {
    const
        {locales: siteLocales, defaultLocaleCode: defaultSiteLocaleCode} = await getSiteLocales()

    deepFreeze(siteLocales)

    const
        siteLocalesGen = patchSiteLocales(siteLocales, defaultSiteLocaleCode),
        siteDir = process.cwd(),
        publicDir = isProduction ? join(siteDir, 'build') : join(siteDir, 'public'),
        robotsTxtFilePath = join(siteDir, 'robots', (isRC ? 'rc' : 'production'), 'robots.txt'),

        render = renderPage(siteLocales, defaultSiteLocaleCode, (result => {
            const
                split = result[0].split('<title>The internet is for pOOOrn</title>'),

                // Removing <script> tag for development (non-production) mode
                // because there's no frontend scripts in development SSR pages.
                preRoot = process.env.NODE_ENV === 'production' ? g(split, 1) :
                    split[1].replace(/<script id="loading-script">[^\0]*<\/script>/m, ''),

                htmlAttrsSplit = split[0].split(/helmet_html_attributes/),
                bodyAttrsSplit = preRoot.split(/helmet_body_attributes/),

                resultLayout = Object.freeze({
                    pre: Object.freeze({
                        beforeHtmlAttrs: g(htmlAttrsSplit, 0),
                        afterHtmlAttrs: g(htmlAttrsSplit, 1),
                    }),
                    middle: Object.freeze({
                        beforeBodyAttrs: g(bodyAttrsSplit, 0),
                        afterBodyAttrs: `${g(bodyAttrsSplit, 1)}<div id="root">`,
                    }),
                    post: `</div>${g(result, 1)}`,
                })

            if (process.env.NODE_ENV !== 'production') {
                assertPropTypes(
                    attrsSplitModel, htmlAttrsSplit, 'ssr/index', 'html attributes split'
                )

                assertPropTypes(
                    attrsSplitModel, bodyAttrsSplit, 'ssr/index', 'body attributes split'
                )

                assertPropTypes(layoutModel, resultLayout, 'ssr/index', 'layout')
            }

            return resultLayout
        })(
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

    app.use((req, res) => render(req, res, newStore(siteLocalesGen(req), g(req, 'url'))))

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
