import {get} from 'lodash'
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import queryString from 'query-string'
import {compose, setPropTypes} from 'recompose'

import status500 from './App/helpers/status500BranchResolver'

import {
    getSubPage,
    immutableProvedGet as ig,
    PropTypes,
    assertPropTypes,
} from './App/helpers'

import {immutableLocaleRouterModel, routerLocationModel} from './App/models'

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

import FavoritePornstars from './App/FavoritePornstars'
import favoritePornstarsActions from './App/FavoritePornstars/actions'
import {loadFavoritePornstarsPageFlow} from './App/FavoritePornstars/sagas'

import VideoPage from './App/VideoPage'
import videoPageActions from './App/VideoPage/actions'
import {loadVideoPageFlow} from './App/VideoPage/sagas'

import NotFound from './App/NotFound'

export const
    // The `r` argument is this store branch: `app.locale.router`.
    routerGetters = Object.freeze({
        home: Object.freeze({
            path: r => '/',
            link: r => '/',
        }),

        allNiches: Object.freeze({
            path: r => `/${ig(r, 'routes', 'allNiches', 'section')}`,
            link: r => `/${ig(r, 'routes', 'allNiches', 'section')}`,
        }),
        niche: Object.freeze({
            path: r => `/${ig(r, 'routes', 'niche', 'section')}/:child`,
            link: (r, child) => `/${ig(r, 'routes', 'niche', 'section')}/${child}`,
        }),
        nicheArchive: Object.freeze({
            path: r =>
                `/${ig(r, 'routes', 'niche', 'section')
                }/:child/${ig(r, 'routes', 'archive', 'label')
                }/(\\d{4})-(\\d{2})`,
            link: (r, child, year, month) =>
                `/${ig(r, 'routes', 'niche', 'section')
                }/${child}/${ig(r, 'routes', 'archive', 'label')
                }/${year}-${month}`,
        }),

        allMovies: Object.freeze({
            path: r => `/${ig(r, 'routes', 'allMovies', 'section')}`,
            link: r => `/${ig(r, 'routes', 'allMovies', 'section')}`,
        }),
        allMoviesArchive: Object.freeze({
            path: r =>
                `/${ig(r, 'routes', 'allMovies', 'section')
                }/${ig(r, 'routes', 'archive', 'label')
                }(\\d{4})-(\\d{2})`,
            link: (r, year, month) =>
                `/${ig(r, 'routes', 'allMovies', 'section')
                }/${ig(r, 'routes', 'archive', 'label')
                }/${year}-${month}`,
        }),

        pornstars: Object.freeze({
            path: r => `/${ig(r, 'routes', 'pornstars', 'section')}`,
            link: r => `/${ig(r, 'routes', 'pornstars', 'section')}`,
        }),
        pornstar: Object.freeze({
            path: r => `/${ig(r, 'routes', 'pornstar', 'section')}/:child`,
            link: (r, child) => `/${ig(r, 'routes', 'pornstar', 'section')}/${child}`,
        }),

        favorite: Object.freeze({
            path: r => `/${ig(r, 'routes', 'favorite', 'section')}`,
            link: r => `/${ig(r, 'routes', 'favorite', 'section')}`,
        }),
        favoritePornstars: Object.freeze({
            path: r => `/${ig(r, 'routes', 'favoritePornstars', 'section')}`,
            link: r => `/${ig(r, 'routes', 'favoritePornstars', 'section')}`,
        }),

        video: Object.freeze({
            redirectFrom: r =>
                `/${ig(r, 'redirects', 'video', 'fromPfx')
                }:child/:name${ig(r, 'redirects', 'video', 'fromExt')}`,
            path: r => `/${ig(r, 'routes', 'video', 'sectionPfx')}:child/:name`,
            link: (r, videoId, title) =>
                `/${ig(r, 'routes', 'video', 'sectionPfx')
                }${videoId}/${title.replace(/ /g, '-')}`,
        }),
    })

const
    getterModel = PropTypes.exact({
        path: PropTypes.func,
        link: PropTypes.func,
    }),

    routerGettersModel = PropTypes.exact({
        home: getterModel,

        allNiches: getterModel,
        niche: getterModel,
        nicheArchive: getterModel,

        allMovies: getterModel,
        allMoviesArchive: getterModel,

        pornstars: getterModel,
        pornstar: getterModel,

        favorite: getterModel,
        favoritePornstars: getterModel,

        video: PropTypes.exact({
            redirectFrom: PropTypes.func,
            path: PropTypes.func,
            link: PropTypes.func,
        }),
    })

if (process.env.NODE_ENV !== 'production')
    assertPropTypes(routerGettersModel, routerGetters, 'router-builder', 'routerGetters')

// `staticContext` is for only for Server-Side Rendering here.
// `staticContext.isPreRouting` means we don't need to render any component
// (using just `null` plugs) but to just prepare meta info for SSR
// (such as status code, redirect, action to dispatch).
// The `router` prop is this store branch: `app.locale.router`.
const RouterBuilder = ({router: r, location}) => <Switch>
    <Route exact path={routerGetters.home.path(r)} render={props => {
        if (ig(location, 'search') === ig(r, 'redirects', 'categories', 'search'))
            return <Redirect to={routerGetters.allNiches.link(r)}/>

        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.saga = loadHomeFlow.bind(null, null)
            props.staticContext.statusCodeResolver = status500(['app', 'home', 'isFailed'])
            return null
        } else
            return <Home {...props}/>
    }}/>

    <Route exact path={routerGetters.allNiches.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.saga = loadAllNichesPageFlow.bind(null, null)
            props.staticContext.statusCodeResolver = status500(['app', 'niches', 'all', 'isFailed'])
            return null
        } else
            return <AllNiches {...props}/>
    }}/>
    <Route path={routerGetters.nicheArchive.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(ig(location, 'search')),
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
    <Route path={routerGetters.niche.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(ig(location, 'search')),
                {match: {params}, staticContext: x} = props,
                action = nicheActions.loadPageRequest(getSubPage(params.child, sort, page))

            x.saga = loadNichePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
            return null
        } else
            return <Niche {...props}/>
    }}/>

    <Redirect
        exact
        from={ig(r, 'redirects', 'allMovies', 'from')}
        to={routerGetters.allMovies.link(r)}
    />
    <Route exact path={routerGetters.allMovies.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(ig(location, 'search')),
                action = allMoviesActions.loadPageRequest(getSubPage(null, sort, page))

            props.staticContext.saga = loadAllMoviesPageFlow.bind(null, action)
            props.staticContext.statusCodeResolver = status500(['app', 'allMovies', 'isFailed'])
            return null
        } else
            return <AllMovies {...props}/>
    }}/>
    <Route path={routerGetters.allMoviesArchive.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(ig(location, 'search')),
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

    <Redirect
        exact
        from={ig(r, 'redirects', 'pornstars', 'from')}
        to={routerGetters.pornstars.link(r)}
    />
    <Route exact path={routerGetters.pornstars.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadPornstarsPageFlow.bind(null, null)
            x.statusCodeResolver = status500(['app', 'pornstars', 'all', 'isFailed'])
            return null
        } else
            return <Pornstars {...props}/>
    }}/>
    <Route path={routerGetters.pornstar.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {sort, page} = queryString.parse(ig(location, 'search')),
                {match: {params}, staticContext: x} = props,
                action = pornstarActions.loadPageRequest(getSubPage(params.child, sort, page))

            x.saga = loadPornstarPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'pornstars', 'pornstar', 'isFailed'])
            return null
        } else
            return <Pornstar {...props}/>
    }}/>

    <Redirect
        exact
        from={ig(r, 'redirects', 'favorite', 'from')}
        to={routerGetters.favorite.link(r)}
    />
    <Redirect
        exact
        from={ig(r, 'redirects', 'favorite', 'fromMovies')}
        to={routerGetters.favorite.link(r)}
    />
    <Route exact path={routerGetters.favorite.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadFavoritePageFlow.bind(
                null,
                favoriteActions.loadPageRequest()
            )
            x.statusCodeResolver = status500(['app', 'favorite', 'isFailed'])
            return null
        } else
            return <Favorite {...props}/>
    }}/>

    <Redirect
        exact
        from={ig(r, 'redirects', 'favoritePornstars', 'from')}
        to={routerGetters.favoritePornstars.link(r)}
    />
    <Route path={routerGetters.favoritePornstars.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadFavoritePornstarsPageFlow.bind(
                null,
                favoritePornstarsActions.loadPageRequest()
            )
            x.statusCodeResolver = status500(['app', 'favorite', 'isFailed'])
            return null
        } else
            return <FavoritePornstars {...props}/>
    }}/>

    <Redirect
        exact
        from={routerGetters.video.redirectFrom(r)}
        to={routerGetters.video.path(r) /* it must be `path` here, not `link`! */}
    />
    <Route path={routerGetters.video.path(r)} render={props => {
        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match: {params}, staticContext: x} = props,
                action = videoPageActions.loadPageRequest(
                    getSubPage(`${params.child}/${params.name}`)
                )

            x.saga = loadVideoPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'videoPage', 'isFailed'])
            return null
        } else
            return <VideoPage {...props}/>
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

export default compose(
    setPropTypes({
        location: routerLocationModel,
        router: immutableLocaleRouterModel,
    })
)(RouterBuilder)
