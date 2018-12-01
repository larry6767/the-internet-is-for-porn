import React from 'react'

import {mkHandler, mkHandlers} from './helpers'
import {initialStoreOnUrl, newStore} from './store'
import {proxiedHeaders} from './backend-proxy'
import * as requests from './requests'
import {logRequestError} from './helpers'

import Home from '../../src/App/Home'
import AllNiches from '../../src/App/AllNiches'
import allNichesActions from '../../src/App/AllNiches/actions'
import Niche from '../../src/App/AllNiches/Niche'
import nicheActions from '../../src/App/AllNiches/Niche/actions'
import AllMovies from '../../src/App/AllMovies'
import allMoviesActions from '../../src/App/AllMovies/actions'
import Pornstars from '../../src/App/Pornstars'
import NotFound from '../../src/App/NotFound'
import errorActions from '../../src/generic/ErrorMessage/actions'
import getSubPage from '../../shared-src/routes/niche/getSubPage'

const
    pageHandler = async (req, res, pageCode, subPage, pageActions) => {
        const
            store = newStore(initialStoreOnUrl(req.url))

        try {
            store.dispatch(pageActions.loadPageSuccess({
                subPage,
                data: await requests.getPageData({
                    headers: proxiedHeaders(req),
                    pageCode: pageCode,
                    subPageCode: subPage,
                })
            }))
        } catch (err) {
            logRequestError(req)(err)
            store.dispatch(pageActions.loadPageFailure())
            store.dispatch(errorActions.openErrorMessage())
            res.status(500)
        }
        return store
    },

    allNichesHandler = async (render, req, res, subPage) => {
        const
            store = await pageHandler(req, res, requests.allNichesPageCode, subPage, allNichesActions)

        return render(res, <AllNiches/>, store, [
            ['app', 'niches', 'all'],
            ['generic', 'errorMessage'],
        ])
    },

    nichePageHandler = async (render, req, res, subPage) => {
        const
            store = await pageHandler(req, res, requests.nichePageCode, subPage, nicheActions)

        return render(res, <Niche/>, store, [
            ['app', 'niches', 'niche'],
            ['generic', 'errorMessage'],
        ])
    },

    allMoviesPageHandler = async (render, req, res, subPage) => {
        const
            store = await pageHandler(req, res, requests.allMoviesPageCode, subPage, allMoviesActions)

        return render(res, <AllMovies/>, store, [
            ['app', 'allMovies'],
            ['generic', 'errorMessage'],
        ])
    }

// WARNING! keep this up to date with front-end routing!
//
// `render`'s argument is a function which arguments is:
//   1. Response object from express.js
//   2. React component (like jsx of <SomeComponent/>)
//   3. Initial store state, some immutable.js object such as `fromJS({})`
//   4. Optional store branches paths to send to front-end to avoid double backend data request
//      (an example: `[['one', 'branch', 'path'], ['second', 'branch', 'path']]`)
// `render` is an async function which returns a `Promise`
export const routeMapping = render => [
    ['/', mkHandlers('get', [
        (req, res, next) =>
            req.url === '/?categories'
                ? res.redirect('/all-niches')
                : next(),

        (req, res) => render(res, <Home/>, newStore(initialStoreOnUrl(req.url))),
    ])],

    ['/all-niches', mkHandler('get', async (req, res) =>
        await allNichesHandler(
            render, req, res
        ))],

    // front-end route: /all-niches/:child/archive/(\d{4})-(\d{2})
    [/^\/all-niches\/([^\/]+)\/archive\/(\d{4})-(\d{2})$/, mkHandler('get', async (req, res) =>
        await nichePageHandler(
            render, req, res,
            getSubPage(
                req.params[0],
                req.query.sort,
                req.query.page,
                [req.params[1], req.params[2]]
            )
        ))],

    ['/all-niches/:child', mkHandler('get', async (req, res) =>
        await nichePageHandler(
            render, req, res,
            getSubPage(req.params.child, req.query.sort, req.query.page)
        ))],

    ['/all-movies.html', mkHandler('get', (req, res) => res.redirect('/all-movies'))],

    // front-end route: /all-niches/archive/(\d{4})-(\d{2})
    [/^\/all-movies\/archive\/(\d{4})-(\d{2})$/, mkHandler('get', async (req, res) =>
        await allMoviesPageHandler(
            render, req, res,
            getSubPage(
                null,
                req.query.sort,
                req.query.page,
                [req.params[0], req.params[1]]
            )
        ))],

    ['/all-movies', mkHandler('get', async (req, res) =>
        await allMoviesPageHandler(
            render, req, res,
            getSubPage(
                req.params[0],
                req.query.sort,
                req.query.page
            )
        ))],

    ['/porn-stars.html', mkHandler('get', (req, res) => res.redirect('/pornstars'))],
    ['/pornstars', mkHandler('get', (req, res) =>
        render(res, <Pornstars/>, newStore(initialStoreOnUrl(req.url)))
    )],

    ['*', mkHandler('get', (req, res) => {
        res.status(404)
        return render(res, <NotFound/>, newStore(initialStoreOnUrl(req.url)))
    })],
]
