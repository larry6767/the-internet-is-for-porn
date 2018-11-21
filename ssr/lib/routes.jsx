import React from 'react'

import {mkHandler, mkHandlers} from './helpers'
import {initialStoreOnUrl, newStore} from './store'
import {renderComponent} from './render'
import {proxiedHeaders} from './backend-proxy'
import * as requests from './requests'
import {logRequestError} from './helpers'

import Home from '../../src/App/Home'
import AllNiches from '../../src/App/AllNiches'
import AllNichesActions from '../../src/App/AllNiches/actions'
import Niche from '../../src/App/AllNiches/Niche'
import NicheActions from '../../src/App/AllNiches/Niche/actions'
import AllMovies from '../../src/App/AllMovies'
import Pornstars from '../../src/App/Pornstars'
import NotFound from '../../src/App/NotFound'
import errorActions from '../../src/generic/ErrorMessage/actions'


// WARNING! keep this up to date with front-end routing!
//
// `render`'s argument is a function which arguments is:
//   1. Response object from express.js
//   2. React component (like jsx of <SomeComponent/>)
//   3. Initial store state, some immutable.js object such as `fromJS({})`
// `render` is an async function which returns a `Promise`
export const routeMapping = render => ({
    '/': mkHandlers('get', [
        (req, res, next) =>
            req.url === '/?categories'
                ? res.redirect('/all-niches')
                : next(),

        (req, res) => render(res, <Home/>, newStore(initialStoreOnUrl(req.url))),
    ]),

    '/all-niches': mkHandler('get', async (req, res) => {
        const store = newStore(initialStoreOnUrl(req.url))

        try {
            store.dispatch(AllNichesActions.loadPageSuccess(
                await requests.getPageData({
                    headers: proxiedHeaders(req),
                    pageCode: requests.allNichesPageCode,
                })
            ))
        } catch (err) {
            logRequestError(req)(err)
            store.dispatch(AllNichesActions.loadPageFailure())
            store.dispatch(errorActions.openErrorMessage())
            res.status(500)
        }

        return render(res, <AllNiches/>, store)
    }),

    '/all-niches/:child': mkHandler('get', async (req, res) => {
        const store = newStore(initialStoreOnUrl(req.url))

        try {
            store.dispatch(NicheActions.loadPageSuccess({
                subPage: requests.allNichesPageCode,
                data: await requests.getPageData({
                    headers: proxiedHeaders(req),
                    pageCode: requests.nichePageCode,
                    subPageCode: req.params.child,
                })
            }))
        } catch (err) {
            logRequestError(req)(err)
            store.dispatch(NicheActions.loadPageFailure())
            store.dispatch(errorActions.openErrorMessage())
            res.status(500)
        }

        return render(res, <Niche/>, store)
    }),

    '/all-movies.html': mkHandler('get', (req, res) => res.redirect('/all-movies')),
    '/all-movies': mkHandler('get', (req, res) =>
        render(res, <AllMovies/>, newStore(initialStoreOnUrl(req.url)))
    ),

    '/porn-stars.html': mkHandler('get', (req, res) => res.redirect('/pornstars')),
    '/pornstars': mkHandler('get', (req, res) =>
        render(res, <Pornstars/>, newStore(initialStoreOnUrl(req.url)))
    ),

    '*': mkHandler('get', (req, res) => {
        res.status(404)
        return render(res, <NotFound/>, newStore(initialStoreOnUrl(req.url)))
    }),
})
