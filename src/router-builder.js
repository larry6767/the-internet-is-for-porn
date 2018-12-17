import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {get} from 'lodash'
import queryString from 'query-string'

import status500 from './App/helpers/status500BranchResolver'
import {getSubPage} from './App/helpers'

import Home from './App/Home'
import {loadHomeFlow} from './App/Home/sagas'

import AllNiches from './App/AllNiches'
import {loadAllNichesPageFlow} from './App/AllNiches/sagas'

import Niche from './App/AllNiches/Niche'
import nicheActions from './App/AllNiches/Niche/actions'
import {loadNichePageFlow} from './App/AllNiches/Niche/sagas'

import AllMovies from './App/AllMovies'
import allMoviesActions from './App/AllMovies/actions'
import {loadAllMoviesPageFlow} from './App/AllMovies/sagas'

import Pornstars from './App/Pornstars'
import {loadPornstarsPageFlow} from './App/Pornstars/sagas'

import Pornstar from './App/Pornstars/Pornstar'
import pornstarActions from './App/Pornstars/Pornstar/actions'
import {loadPornstarPageFlow} from './App/Pornstars/Pornstar/sagas'

import Favorite from './App/Favorite'
import favoriteActions from './App/Favorite/actions'
import {loadFavoritePageFlow} from './App/Favorite/sagas'

import NotFound from './App/NotFound'

// `staticContext` is for only for Server-Side Rendering here.
// `staticContext.isPreRouting` means we don't need to render any component
// (using just `null` plugs) but to just prepare meta info for SSR
// (such as status code, redirect, action to dispatch).
export default ({location}) => <Switch>
    <Route exact path="/" render={props => {
        if (location.get('search') === '?categories')
            return <Redirect to="/all-niches"/>

        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.saga = loadHomeFlow.bind(null, null)
            props.staticContext.statusCodeResolver = status500(['app', 'home', 'isFailed'])
            return null
        } else
            return <Home {...props}/>
    }}/>

    <Route exact path="/all-niches" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.saga = loadAllNichesPageFlow.bind(null, null)
            props.staticContext.statusCodeResolver = status500(['app', 'niches', 'all', 'isFailed'])
            return null
        } else
            return <AllNiches {...props}/>
    }}/>
    <Route path="/all-niches/:child/archive/(\d{4})-(\d{2})" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(location.get('search')),
                {match: {params}, staticContext: x} = props,
                action = nicheActions.loadPageRequest(
                    getSubPage(params.child, sort, page, [params[0], params[1]])
                )

            x.saga = loadNichePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
            return null
        } else
            return <Niche {...props}/>
    }}/>
    <Route path="/all-niches/:child" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(location.get('search')),
                {match: {params}, staticContext: x} = props,
                action = nicheActions.loadPageRequest(getSubPage(params.child, sort, page))

            x.saga = loadNichePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
            return null
        } else
            return <Niche {...props}/>
    }}/>

    <Route exact path="/all-movies.html" render={() => <Redirect to="/all-movies"/>}/>
    <Route exact path="/all-movies" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(location.get('search')),
                action = allMoviesActions.loadPageRequest(getSubPage(null, sort, page))

            props.staticContext.saga = loadAllMoviesPageFlow.bind(null, action)
            props.staticContext.statusCodeResolver = status500(['app', 'allMovies', 'isFailed'])
            return null
        } else
            return <AllMovies {...props}/>
    }}/>
    <Route path="/all-movies/archive/(\d{4})-(\d{2})" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(location.get('search')),
                {match: {params}, staticContext: x} = props,
                action = allMoviesActions.loadPageRequest(
                    getSubPage(null, sort, page, [params[0], params[1]])
                )

            x.saga = loadAllMoviesPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'allMovies', 'isFailed'])
            return null
        } else
            return <AllMovies {...props}/>
    }}/>

    <Route exact path="/porn-stars.html" render={() => <Redirect to="/porn-stars"/>}/>
    <Route exact path="/porn-stars" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadPornstarsPageFlow.bind(null, null)
            x.statusCodeResolver = status500(['app', 'pornstars', 'all', 'isFailed'])
            return null
        } else
            return <Pornstars {...props}/>
    }}/>
    <Route path="/porn-star/:child" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(location.get('search')),
                {match: {params}, staticContext: x} = props,
                action = pornstarActions.loadPageRequest(getSubPage(params.child, sort, page))

            x.saga = loadPornstarPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'pornstars', 'pornstar', 'isFailed'])
            return null
        } else
            return <Pornstar {...props}/>
    }}/>

    <Route exact path="/your-favorite.html" render={() => <Redirect to="/favorite"/>}/>
    <Route exact path="/favorite" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadFavoritePageFlow.bind(null, null)
            x.statusCodeResolver = status500(['app', 'favorite'])
            return null
        } else
            return <Favorite {...props}/>
    }}/>

    <Route path="/your-favorite-porn-stars.html" render={() =>
        <Redirect to="/favorite-porn-stars"/>}/>
    <Route path="/favorite-porn-stars" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadFavoritePageFlow.bind(null, null)
            x.statusCodeResolver = status500(['app', 'favorite'])
            return null
        } else
            return <Favorite {...props}/>
    }}/>

    <Route render={props => {
        // making real 404 status response on server-side rendering
        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.statusCodeResolver = () => 404
            return null
        } else
            return <NotFound {...props}/>
    }}/>
</Switch>
