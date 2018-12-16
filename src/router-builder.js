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
import {loadNichePageFlow} from './App/AllNiches/Niche/sagas'
import nicheActions from './App/AllNiches/Niche/actions'
import AllMovies from './App/AllMovies'
import Pornstars from './App/Pornstars'
import Pornstar from './App/Pornstars/Pornstar'
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
                {match: {params}, staticContext} = props,
                action = nicheActions.loadPageRequest(
                    getSubPage(params.child, sort, page, [params[0], params[1]])
                )

            staticContext.saga = loadNichePageFlow.bind(null, action)
            staticContext.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
            return null
        } else
            return <Niche {...props}/>
    }}/>
    <Route path="/all-niches/:child" render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(location.get('search')),
                {match: {params}, staticContext} = props,
                action = nicheActions.loadPageRequest(getSubPage(params.child, sort, page))

            staticContext.saga = loadNichePageFlow.bind(null, action)
            staticContext.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
            return null
        } else
            return <Niche {...props}/>
    }}/>

    <Route exact path="/all-movies.html" render={() => <Redirect to="/all-movies"/>}/>
    <Route exact path="/all-movies" component={AllMovies}/>
    <Route path="/all-movies/archive/(\d{4})-(\d{2})" component={AllMovies}/>

    <Route exact path="/porn-stars.html" render={() => <Redirect to="/porn-stars"/>}/>
    <Route exact path="/porn-stars" component={Pornstars}/>
    <Route path="/porn-star/:child" component={Pornstar}/>

    <Route render={props => {
        // making real 404 status response on server-side rendering
        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.statusCodeResolver = () => 404
            return null
        } else
            return <NotFound {...props}/>
    }}/>
</Switch>
