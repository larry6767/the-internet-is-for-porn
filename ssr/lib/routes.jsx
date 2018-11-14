import React from 'react'

import {mkHandler, mkHandlers} from './helpers'
import {initialStoreOnUrl, newStore} from './store'
import {renderComponent} from './render'

import Home from '../../src/App/Home'
import AllNiches from '../../src/App/AllNiches'
import AllMovies from '../../src/App/AllMovies'
import Pornstars from '../../src/App/Pornstars'
import NotFound from '../../src/App/NotFound'


// WARNING! keep this up to date with front-end routing!
export const routeMapping = {
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
