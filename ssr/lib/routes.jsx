import React from 'react'

import {mkHandler, mkHandlers} from './helpers'
import {initialStoreOnUrl, newStore} from './store'
import {renderComponent} from './render'

import Home from '../../src/App/Home'
import AllNiches from '../../src/App/AllNiches'
import Niche from '../../src/App/AllNiches/Niche'
import AllMovies from '../../src/App/AllMovies'
import Pornstars from '../../src/App/Pornstars'
import NotFound from '../../src/App/NotFound'


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

    '/all-niches': mkHandler('get', (req, res) =>
        render(res, <AllNiches/>, newStore(initialStoreOnUrl(req.url)))
    ),

    '/all-niches/:child': mkHandler('get', (req, res) =>
        render(res, <Niche/>, newStore(initialStoreOnUrl(req.url)))
    ),

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
