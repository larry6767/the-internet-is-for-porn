import {get, flatten} from 'lodash'
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {compose} from 'recompose'

// local libs
import {plainProvedGet as g, setPropTypes, getPageRequestParams} from 'src/App/helpers'
import status500 from 'src/App/helpers/status500BranchResolver'

import {routerContextModel, orientationCodes, defaultOrientationCode} from 'src/App/models'

import Home from 'src/App/Home'
import homeActions from 'src/App/Home/actions'
import {loadHomeFlow} from 'src/App/Home/sagas'

import AllNiches from 'src/App/AllNiches'
import allNichesActions from 'src/App/AllNiches/actions'
import {loadAllNichesPageFlow} from 'src/App/AllNiches/sagas'

import Niche from 'src/App/Niche'
import nicheActions from 'src/App/Niche/actions'
import {loadNichePageFlow} from 'src/App/Niche/sagas'

import AllMovies from 'src/App/AllMovies'
import allMoviesActions from 'src/App/AllMovies/actions'
import {loadAllMoviesPageFlow} from 'src/App/AllMovies/sagas'

import Pornstars from 'src/App/Pornstars'
import pornstarsActions from 'src/App/Pornstars/actions'
import {loadPornstarsPageFlow} from 'src/App/Pornstars/sagas'

import Pornstar from 'src/App/Pornstar'
import pornstarActions from 'src/App/Pornstar/actions'
import {loadPornstarPageFlow} from 'src/App/Pornstar/sagas'

import Favorite from 'src/App/Favorite'
import favoriteActions from 'src/App/Favorite/actions'
import {loadFavoritePageFlow} from 'src/App/Favorite/sagas'

import FavoritePornstars from 'src/App/FavoritePornstars'
import favoritePornstarsActions from 'src/App/FavoritePornstars/actions'
import {loadFavoritePornstarsPageFlow} from 'src/App/FavoritePornstars/sagas'

import VideoPage from 'src/App/VideoPage'
import videoPageActions from 'src/App/VideoPage/actions'
import {loadVideoPageFlow} from 'src/App/VideoPage/sagas'

import FindVideos from 'src/App/FindVideos'
import findVideosActions from 'src/App/FindVideos/actions'
import {loadFindVideosPageFlow} from 'src/App/FindVideos/sagas'

import Site from 'src/App/Site'
import siteActions from 'src/App/Site/actions'
import {loadSitePageFlow} from 'src/App/Site/sagas'

import NotFound from 'src/App/NotFound'
import notFoundActions from 'src/App/NotFound/actions'
import {loadNotFoundPageFlow} from 'src/App/NotFound/sagas'

import routerGetters from 'src/App/routerGetters'

import {
    HOME,
    ALL_NICHES,
    NICHE,
    ALL_MOVIES,
    PORNSTARS,
    PORNSTAR,
    FAVORITE,
    FAVORITE_PORNSTARS,
    VIDEO,
    FIND_VIDEOS,
    SITE,
    NOT_FOUND,
} from 'src/App/constants'

// `staticContext` is for only for Server-Side Rendering here.
// `staticContext.isPreRouting` means we don't need to render any component
// (using just `null` plugs) but to just prepare meta info for SSR
// (such as status code, action to dispatch).
const RouterBuilder = ({routerContext: r}) => <Switch>
    {/* home */}
    {orientationCodes.map(orientationCode => <Route
        key={`${orientationCode}-${HOME}`}
        exact
        path={routerGetters.home.path(r, orientationCode)}
        render={props => {
            const currentSection = HOME

            if (get(props, ['staticContext', 'isPreRouting'])) {
                const
                    {match, staticContext: x} = props,
                    orientedR = r.set('currentOrientation', orientationCode),
                    pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                    action = homeActions.loadPageRequest({pageRequestParams})

                x.saga = loadHomeFlow.bind(null, action)
                x.statusCodeResolver = status500(['app', HOME, 'isFailed'])
                x.currentOrientation = orientationCode
                x.currentSection = currentSection
                return null
            } else
                return <Home
                    {...props}
                    currentSection={currentSection}
                    orientationCode={orientationCode}
                />
        }}
    />)}

    {/* all niches */}
    {flatten(orientationCodes.map(orientationCode => [
        <Route
            key={`${orientationCode}-${ALL_NICHES}`}
            exact
            path={routerGetters.allNiches.path(r, orientationCode)}
            render={props => {
                const currentSection = ALL_NICHES

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = allNichesActions.loadPageRequest({pageRequestParams})

                    x.saga = loadAllNichesPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', ALL_NICHES, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <AllNiches
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />,
        <Route
            key={`${orientationCode}-${NICHE}Archive`}
            path={routerGetters.nicheArchive.path(r, orientationCode)}
            render={props => {
                const currentSection = NICHE

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = nicheActions.loadPageRequest({pageRequestParams})

                    x.saga = loadNichePageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', NICHE, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <Niche
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />,
        <Route
            key={`${orientationCode}-${NICHE}`}
            path={routerGetters.niche.path(r, orientationCode)}
            render={props => {
                const currentSection = NICHE

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = nicheActions.loadPageRequest({pageRequestParams})

                    x.saga = loadNichePageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', NICHE, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <Niche
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />,
    ]))}

    {/* all movies */}
    {flatten(orientationCodes.map(orientationCode => [
        <Route
            key={`${orientationCode}-${ALL_MOVIES}`}
            exact
            path={routerGetters.allMovies.path(r, orientationCode)}
            render={props => {
                const currentSection = ALL_MOVIES

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = allMoviesActions.loadPageRequest({pageRequestParams})

                    x.saga = loadAllMoviesPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', ALL_MOVIES, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <AllMovies
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />,
        <Route
            key={`${orientationCode}-${ALL_MOVIES}Archive`}
            path={routerGetters.allMoviesArchive.path(r, orientationCode)}
            render={props => {
                const currentSection = ALL_MOVIES

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = allMoviesActions.loadPageRequest({pageRequestParams})

                    x.saga = loadAllMoviesPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', ALL_MOVIES, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <AllMovies
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />,
    ]))}

    {/* pornstars */}
    {flatten(orientationCodes.map(orientationCode => [
        <Route
            key={`${orientationCode}-${PORNSTARS}`}
            exact
            path={routerGetters.pornstars.path(r, orientationCode)}
            render={props => {
                const currentSection = PORNSTARS

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = pornstarsActions.loadPageRequest({pageRequestParams})

                    x.saga = loadPornstarsPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', PORNSTARS, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <Pornstars
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />,
        <Route
            key={`${orientationCode}-${PORNSTAR}`}
            path={routerGetters.pornstar.path(r, orientationCode)}
            render={props => {
                const currentSection = PORNSTAR

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = pornstarActions.loadPageRequest({pageRequestParams})

                    x.saga = loadPornstarPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', PORNSTAR, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <Pornstar
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />,
    ]))}

    {/* favorite */}
    {/*
        Favorite pages are shared for all orientations, so no need for orientation routes.
        We could implement in the future filters such as "all favorie pornstars/videos" and
        "straight/gay/tranny favorite pornstars/videos" on frontend side only if we refactor that
        cookies for favorites by replacing them with `window.localStorage` while simulating cookies
        for backend (converting passed values in request body in to cookie header).
    */}
    <Route exact path={routerGetters.favorite.path(r)} render={props => {
        const currentSection = FAVORITE

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match, staticContext: x} = props,
                orientedR = r.set('currentOrientation', defaultOrientationCode),
                pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                action = favoriteActions.loadPageRequest({pageRequestParams})

            x.saga = loadFavoritePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', FAVORITE, 'isFailed'])
            x.currentSection = currentSection
            // x.currentOrientation = orientationCode
            return null
        } else
            return <Favorite
                {...props}
                currentSection={currentSection}
                /*orientationCode={orientationCode}*/
            />
    }}/>
    <Route path={routerGetters.favoritePornstars.path(r)} render={props => {
        const currentSection = FAVORITE_PORNSTARS

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match, staticContext: x} = props,
                orientedR = r.set('currentOrientation', defaultOrientationCode),
                pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                action = favoritePornstarsActions.loadPageRequest({pageRequestParams})

            x.saga = loadFavoritePornstarsPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', FAVORITE_PORNSTARS, 'isFailed'])
            x.currentSection = currentSection
            // x.currentOrientation = orientationCode
            return null
        } else
            return <FavoritePornstars
                {...props}
                currentSection={currentSection}
                /*orientationCode={orientationCode}*/
            />
    }}/>

    {/* video */}
    {orientationCodes.map(orientationCode =>
        <Route
            key={`${orientationCode}-${VIDEO}`}
            path={routerGetters.video.path(r, orientationCode)}
            render={props => {
                const currentSection = VIDEO

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = videoPageActions.loadPageRequest({pageRequestParams})

                    x.saga = loadVideoPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', VIDEO, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <VideoPage
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />
    )}

    {/* search */}
    {orientationCodes.map(orientationCode =>
        <Route
            key={`${orientationCode}-${FIND_VIDEOS}`}
            exact
            path={routerGetters.findVideos.path(r, orientationCode)}
            render={props => {
                const currentSection = FIND_VIDEOS

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = findVideosActions.loadPageRequest({pageRequestParams})

                    x.saga = loadFindVideosPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', FIND_VIDEOS, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <FindVideos
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />
    )}

    {/* site */}
    {orientationCodes.map(orientationCode =>
        <Route
            key={`${orientationCode}-${SITE}`}
            exact
            path={routerGetters.site.path(r, orientationCode)}
            render={props => {
                const currentSection = SITE

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = siteActions.loadPageRequest({pageRequestParams})

                    x.saga = loadSitePageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', SITE, 'isFailed'])
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <Site
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />
    )}

    {/* 404 */}
    {orientationCodes.map(orientationCode =>
        <Route
            key={`${orientationCode}-${NOT_FOUND}`}
            path={routerGetters.notFound.path(r, orientationCode)}
            render={props => {
                const currentSection = NOT_FOUND

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = notFoundActions.loadPageRequest({pageRequestParams})

                    x.saga = loadNotFoundPageFlow.bind(null, action)
                    x.statusCodeResolver = () => 404
                    x.currentOrientation = orientationCode
                    x.currentSection = currentSection
                    return null
                } else
                    return <NotFound
                        {...props}
                        currentSection={currentSection}
                        orientationCode={orientationCode}
                    />
            }}
        />
    )}
</Switch>

export default compose(
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: routerContextModel,
    })
)(RouterBuilder)
