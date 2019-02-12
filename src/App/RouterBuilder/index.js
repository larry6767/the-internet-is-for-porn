import {get, flatten} from 'lodash'
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {compose} from 'recompose'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    get404PageText,
    getPageRequestParams,
} from '../helpers'

import status500 from '../helpers/status500BranchResolver'

import {routerContextModel, orientationCodes, defaultOrientationCode} from '../models'

import Home from '../Home'
import homeActions from '../Home/actions'
import {loadHomeFlow} from '../Home/sagas'

import AllNiches from '../AllNiches'
import allNichesActions from '../AllNiches/actions'
import {loadAllNichesPageFlow} from '../AllNiches/sagas'

import Niche from '../AllNiches/Niche'
import nicheActions from '../AllNiches/Niche/actions'
import {loadNichePageFlow} from '../AllNiches/Niche/sagas'

import AllMovies from '../AllMovies'
import allMoviesActions from '../AllMovies/actions'
import {loadAllMoviesPageFlow} from '../AllMovies/sagas'

import Pornstars from '../Pornstars'
import pornstarsActions from '../Pornstars/actions'
import {loadPornstarsPageFlow} from '../Pornstars/sagas'

import Pornstar from '../Pornstars/Pornstar'
import pornstarActions from '../Pornstars/Pornstar/actions'
import {loadPornstarPageFlow} from '../Pornstars/Pornstar/sagas'

import Favorite from '../Favorite'
import favoriteActions from '../Favorite/actions'
import {loadFavoritePageFlow} from '../Favorite/sagas'

import FavoritePornstars from '../FavoritePornstars'
import favoritePornstarsActions from '../FavoritePornstars/actions'
import {loadFavoritePornstarsPageFlow} from '../FavoritePornstars/sagas'

import VideoPage from '../VideoPage'
import videoPageActions from '../VideoPage/actions'
import {loadVideoPageFlow} from '../VideoPage/sagas'

import FindVideos from '../FindVideos'
import findVideosActions from '../FindVideos/actions'
import {loadFindVideosPageFlow} from '../FindVideos/sagas'

import Site from '../Site'
import siteActions from '../Site/actions'
import {loadSitePageFlow} from '../Site/sagas'

import NotFound from '../NotFound'
import notFoundActions from '../NotFound/actions'
import {loadNotFoundPageFlow} from '../NotFound/sagas'

import routerGetters from '../routerGetters'

// `staticContext` is for only for Server-Side Rendering here.
// `staticContext.isPreRouting` means we don't need to render any component
// (using just `null` plugs) but to just prepare meta info for SSR
// (such as status code, action to dispatch).
const RouterBuilder = ({routerContext: r}) => <Switch>
    {/* home */}
    {orientationCodes.map(orientationCode => <Route
        key={`${orientationCode}-home`}
        exact
        path={routerGetters.home.path(r, orientationCode)}
        render={props => {
            const currentSection = 'home'

            if (get(props, ['staticContext', 'isPreRouting'])) {
                const
                    {match, staticContext: x} = props,
                    orientedR = r.set('currentOrientation', orientationCode),
                    pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                    action = homeActions.loadPageRequest({pageRequestParams})

                x.saga = loadHomeFlow.bind(null, action)
                x.statusCodeResolver = status500(['app', 'home', 'isFailed'])
                x.pageTextResolver = state => ig(state, ['app', 'home', 'pageText'])
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
            key={`${orientationCode}-allNiches`}
            exact
            path={routerGetters.allNiches.path(r, orientationCode)}
            render={props => {
                const currentSection = 'allNiches'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = allNichesActions.loadPageRequest({pageRequestParams})

                    x.saga = loadAllNichesPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'niches', 'all', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'niches', 'all', 'pageText'])
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
            key={`${orientationCode}-nicheArchive`}
            path={routerGetters.nicheArchive.path(r, orientationCode)}
            render={props => {
                const currentSection = 'allNiches'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = nicheActions.loadPageRequest({pageRequestParams})

                    x.saga = loadNichePageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'niches', 'niche', 'pageText'])
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
            key={`${orientationCode}-niche`}
            path={routerGetters.niche.path(r, orientationCode)}
            render={props => {
                const currentSection = 'allNiches'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = nicheActions.loadPageRequest({pageRequestParams})

                    x.saga = loadNichePageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'niches', 'niche', 'pageText'])
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
            key={`${orientationCode}-allMovies`}
            exact
            path={routerGetters.allMovies.path(r, orientationCode)}
            render={props => {
                const currentSection = 'allMovies'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = allMoviesActions.loadPageRequest({pageRequestParams})

                    x.saga = loadAllMoviesPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'allMovies', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'allMovies', 'pageText'])
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
            key={`${orientationCode}-allMovies-archive`}
            path={routerGetters.allMoviesArchive.path(r, orientationCode)}
            render={props => {
                const currentSection = 'allMovies'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = allMoviesActions.loadPageRequest({pageRequestParams})

                    x.saga = loadAllMoviesPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'allMovies', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'allMovies', 'pageText'])
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
            key={`${orientationCode}-pornstars`}
            exact
            path={routerGetters.pornstars.path(r, orientationCode)}
            render={props => {
                const currentSection = 'pornstars'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = pornstarsActions.loadPageRequest({pageRequestParams})

                    x.saga = loadPornstarsPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'pornstars', 'all', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'pornstars', 'all', 'pageText'])
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
            key={`${orientationCode}-pornstar`}
            path={routerGetters.pornstar.path(r, orientationCode)}
            render={props => {
                const currentSection = 'pornstars'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = pornstarActions.loadPageRequest({pageRequestParams})

                    x.saga = loadPornstarPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'pornstars', 'pornstar', 'isFailed'])
                    x.pageTextResolver = state =>
                        ig(state, ['app', 'pornstars', 'pornstar', 'pageText'])
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
        const currentSection = 'favorite'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match, staticContext: x} = props,
                orientedR = r.set('currentOrientation', defaultOrientationCode),
                pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                action = favoriteActions.loadPageRequest({pageRequestParams})

            x.saga = loadFavoritePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'favorite', 'isFailed'])
            x.pageTextResolver = state => ig(state, ['app', 'favorite', 'pageText'])
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
        const currentSection = 'favorite'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match, staticContext: x} = props,
                orientedR = r.set('currentOrientation', defaultOrientationCode),
                pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                action = favoritePornstarsActions.loadPageRequest({pageRequestParams})

            x.saga = loadFavoritePornstarsPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'favorite', 'isFailed'])
            x.pageTextResolver = state => ig(state, ['app', 'favorite', 'pageText'])
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
            key={`${orientationCode}-video`}
            path={routerGetters.video.path(r, orientationCode)}
            render={props => {
                const currentSection = 'allMovies'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = videoPageActions.loadPageRequest({pageRequestParams})

                    x.saga = loadVideoPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'videoPage', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'videoPage', 'pageText'])
                    x.openGraphDataResolver = state =>
                        ig(state, ['app', 'videoPage', 'openGraphData'])
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
            key={`${orientationCode}-findVideos`}
            exact
            path={routerGetters.findVideos.path(r, orientationCode)}
            render={props => {
                const currentSection = 'allMovies'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = findVideosActions.loadPageRequest({pageRequestParams})

                    x.saga = loadFindVideosPageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'findVideos', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'findVideos', 'pageText'])
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
            key={`${orientationCode}-site`}
            exact
            path={routerGetters.site.path(r, orientationCode)}
            render={props => {
                const currentSection = 'site'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = siteActions.loadPageRequest({pageRequestParams})

                    x.saga = loadSitePageFlow.bind(null, action)
                    x.statusCodeResolver = status500(['app', 'site', 'isFailed'])
                    x.pageTextResolver = state => ig(state, ['app', 'site', 'pageText'])
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
            key={`${orientationCode}-notFound`}
            path={routerGetters.notFound.path(r, orientationCode)}
            render={props => {
                const currentSection = 'notFound'

                if (get(props, ['staticContext', 'isPreRouting'])) {
                    const
                        {match, staticContext: x} = props,
                        orientedR = r.set('currentOrientation', orientationCode),
                        pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                        action = notFoundActions.loadPageRequest({pageRequestParams})

                    x.saga = loadNotFoundPageFlow.bind(null, action)
                    x.statusCodeResolver = () => 404
                    x.pageTextResolver = () => get404PageText()
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
