import {get, padStart} from 'lodash'
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import queryString from 'query-string'
import {compose} from 'recompose'

import status500 from './App/helpers/status500BranchResolver'

import {
    localizedGetSubPage,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    assertPropTypes,
    setPropTypes,
} from './App/helpers'

import {routerContextModel} from './App/models'

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

import FindVideos from './App/FindVideos'
import findVideosActions from './App/FindVideos/actions'
import {loadFindVideosPageFlow} from './App/FindVideos/sagas'

import NotFound from './App/NotFound'

const
    getQs = r => queryString.parse(ig(r, 'location', 'search')),
    renderQs = qs => g(Object.keys(qs), 'length') > 0 ? '?' + queryString.stringify(qs) : '',

    orderingAndPaginationQsParamsModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.exact({
            ordering: PropTypes.string.isOptional,
            pagination: PropTypes.number.isOptional,
        }),

    orderingAndPaginationQs = (r, qsParams) => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                orderingAndPaginationQsParamsModel,
                qsParams,
                'orderingAndPaginationQs',
                'qsParams'
            )

        const
            qs = getQs(r)

        if (qsParams.hasOwnProperty('ordering')) {
            const
                ordering = g(qsParams, 'ordering'),
                qsKey = ig(r, 'router', 'ordering', 'qsKey')

            if (ordering === null) // `null` means we need to reset ordering if it's set
                delete qs[qsKey]
            else
                qs[qsKey] = ig(r, 'router', 'ordering', ordering, 'qsValue')
        }

        if (qsParams.hasOwnProperty('pagination')) {
            const
                pagination = g(qsParams, 'pagination'),
                qsKey = ig(r, 'router', 'pagination', 'qsKey')

            if (pagination === null) // `null` means we need to reset pagination if it's set
                delete qs[qsKey]
            else
                qs[qsKey] = pagination
        }

        return qs
    }

export const
    // The `r` argument is this store branch: `app.locale.router`.
    routerGetters = Object.freeze({
        home: Object.freeze({
            path: r => '/',
            link: r => '/',
        }),

        allNiches: Object.freeze({
            path: r => {
                const allNiches = ig(r, 'router', 'routes', 'allNiches', 'section')
                return `/${allNiches}`
            },
            link: r => {
                const allNiches = ig(r, 'router', 'routes', 'allNiches', 'section')
                return `/${allNiches}`
            },
        }),
        niche: Object.freeze({
            path: r => {
                const niche = ig(r, 'router', 'routes', 'niche', 'section')
                return `/${niche}/:child`
            },
            link: (r, child, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    niche = ig(r, 'router', 'routes', 'niche', 'section'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                return `/${niche}/${child}${renderQs(qs)}`
            },
        }),
        nicheArchive: Object.freeze({
            path: r => {
                const
                    niche = ig(r, 'router', 'routes', 'niche', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label')

                return `/${niche}/:child/${archive}/(\\d{4})-(\\d{2})`
            },
            link: (r, child, year, month, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    niche = ig(r, 'router', 'routes', 'niche', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                year = padStart(year, 4, '0')
                month = padStart(month, 2, '0')
                return `/${niche}/${child}/${archive}/${year}-${month}${renderQs(qs)}`
            }
        }),

        allMovies: Object.freeze({
            path: r => {
                const allMovies = ig(r, 'router', 'routes', 'allMovies', 'section')
                return `/${allMovies}`
            },
            link: (r, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    allMovies = ig(r, 'router', 'routes', 'allMovies', 'section'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                return `/${allMovies}${renderQs(qs)}`
            },
        }),
        allMoviesArchive: Object.freeze({
            path: r => {
                const
                    allMovies = ig(r, 'router', 'routes', 'allMovies', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label')

                return `/${allMovies}/${archive}/(\\d{4})-(\\d{2})`
            },
            link: (r, year, month, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    allMovies = ig(r, 'router', 'routes', 'allMovies', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                year = padStart(year, 4, '0')
                month = padStart(month, 2, '0')
                return `/${allMovies}/${archive}/${year}-${month}${renderQs(qs)}`
            },
        }),

        pornstars: Object.freeze({
            path: r => {
                const pornstars = ig(r, 'router', 'routes', 'pornstars', 'section')
                return `/${pornstars}`
            },
            link: r => {
                const pornstars = ig(r, 'router', 'routes', 'pornstars', 'section')
                return `/${pornstars}`
            },
        }),
        pornstar: Object.freeze({
            path: r => {
                const pornstar = ig(r, 'router', 'routes', 'pornstar', 'section')
                return `/${pornstar}/:child`
            },
            link: (r, child, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    pornstar = ig(r, 'router', 'routes', 'pornstar', 'section'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                return `/${pornstar}/${child}${renderQs(qs)}`
            },
        }),

        favorite: Object.freeze({
            path: r => {
                const favorite = ig(r, 'router', 'routes', 'favorite', 'section')
                return `/${favorite}`
            },
            link: (r, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    favorite = ig(r, 'router', 'routes', 'favorite', 'section'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                return `/${favorite}${renderQs(qs)}`
            },
        }),
        favoritePornstars: Object.freeze({
            path: r => {
                const favoritePornstars = ig(r, 'router', 'routes', 'favoritePornstars', 'section')
                return `/${favoritePornstars}`
            },
            link: (r, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    favoritePornstars = ig(r, 'router', 'routes', 'favoritePornstars', 'section'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                return `/${favoritePornstars}${renderQs(qs)}`
            },
        }),

        video: Object.freeze({
            redirectFrom: r => {
                const
                    videoPfx = ig(r, 'router', 'redirects', 'video', 'fromPfx'),
                    ext = ig(r, 'router', 'redirects', 'video', 'fromExt')

                return `/${videoPfx}:child/:name${ext}`
            },
            path: r => {
                const videoPfx = ig(r, 'router', 'routes', 'video', 'sectionPfx')
                return `/${videoPfx}:child/:name`
            },
            link: (r, videoId, title) => {
                const videoPfx = ig(r, 'router', 'routes', 'video', 'sectionPfx')
                return `/${videoPfx}${videoId}/${title.replace(/ /g, '-')}`
            },
        }),

        findVideos: Object.freeze({
            path: r => {
                const findVideos = ig(r, 'router', 'routes', 'findVideos', 'section')
                return `/${findVideos}`
            },
            link: (r, qsParams={/*ordering:'…', pagination:1*/}) => {
                const
                    findVideos = ig(r, 'router', 'routes', 'findVideos', 'section'),
                    qs = qsParams === null ? {} : orderingAndPaginationQs(r, qsParams)

                return `/${findVideos}${renderQs(qs)}`
            },
        }),
    })

const
    getterModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        path: PropTypes.func,
        link: PropTypes.func,
    }),

    routerGettersModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
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

        findVideos: getterModel,
    })

if (process.env.NODE_ENV !== 'production')
    assertPropTypes(routerGettersModel, routerGetters, 'router-builder', 'routerGetters')

// `staticContext` is for only for Server-Side Rendering here.
// `staticContext.isPreRouting` means we don't need to render any component
// (using just `null` plugs) but to just prepare meta info for SSR
// (such as status code, redirect, action to dispatch).
// The `router` prop is this store branch: `app.locale.router`.
const RouterBuilder = ({routerContext: r}) => <Switch>
    <Route exact path={routerGetters.home.path(r)} render={props => {
        if (ig(r, 'location', 'search') === ig(r, 'router', 'redirects', 'categories', 'search'))
            return <Redirect to={routerGetters.allNiches.link(r)}/>

        const currentSection = 'home'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.saga = loadHomeFlow.bind(null, null)
            props.staticContext.statusCodeResolver = status500(['app', 'home', 'isFailed'])
            props.staticContext.currentSection = currentSection
            return null
        } else
            return <Home {...props} currentSection={currentSection}/>
    }}/>

    <Route exact path={routerGetters.allNiches.path(r)} render={props => {
        const currentSection = 'allNiches'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.saga = loadAllNichesPageFlow.bind(null, null)
            props.staticContext.statusCodeResolver = status500(['app', 'niches', 'all', 'isFailed'])
            props.staticContext.currentSection = currentSection
            return null
        } else
            return <AllNiches {...props} currentSection={currentSection}/>
    }}/>
    <Route path={routerGetters.nicheArchive.path(r)} render={props => {
        const currentSection = 'allNiches'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                qs = queryString.parse(ig(r, 'location', 'search')),
                {match: {params}, staticContext: x} = props,
                action = nicheActions.loadPageRequest(localizedGetSubPage(r)(
                    g(params, 'child'),
                    get(qs, [ig(r, 'router', 'ordering', 'qsKey')], null),
                    get(qs, [ig(r, 'router', 'pagination', 'qsKey')], null),
                    [g(params, 0), g(params, 1)]
                ))

            x.saga = loadNichePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <Niche {...props} currentSection={currentSection}/>
    }}/>
    <Route path={routerGetters.niche.path(r)} render={props => {
        const currentSection = 'allNiches'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                qs = queryString.parse(ig(r, 'location', 'search')),
                {match: {params}, staticContext: x} = props,
                action = nicheActions.loadPageRequest(localizedGetSubPage(r)(
                    g(params, 'child'),
                    get(qs, [ig(r, 'router', 'ordering', 'qsKey')], null),
                    get(qs, [ig(r, 'router', 'pagination', 'qsKey')], null)
                ))

            x.saga = loadNichePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'niches', 'niche', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <Niche {...props} currentSection={currentSection}/>
    }}/>

    <Redirect
        exact
        from={ig(r, 'router', 'redirects', 'allMovies', 'from')}
        to={routerGetters.allMovies.link(r)}
    />
    <Route exact path={routerGetters.allMovies.path(r)} render={props => {
        const currentSection = 'allMovies'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                qs = queryString.parse(ig(r, 'location', 'search')),
                action = allMoviesActions.loadPageRequest(localizedGetSubPage(r)(
                    null,
                    get(qs, [ig(r, 'router', 'ordering', 'qsKey')], null),
                    get(qs, [ig(r, 'router', 'pagination', 'qsKey')], null)
                ))

            props.staticContext.saga = loadAllMoviesPageFlow.bind(null, action)
            props.staticContext.statusCodeResolver = status500(['app', 'allMovies', 'isFailed'])
            props.staticContext.currentSection = currentSection
            return null
        } else
            return <AllMovies {...props} currentSection={currentSection}/>
    }}/>
    <Route path={routerGetters.allMoviesArchive.path(r)} render={props => {
        const currentSection = 'allMovies'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                qs = queryString.parse(ig(r, 'location', 'search')),
                {match: {params}, staticContext: x} = props,
                action = allMoviesActions.loadPageRequest(localizedGetSubPage(r)(
                    null,
                    get(qs, [ig(r, 'router', 'ordering', 'qsKey')], null),
                    get(qs, [ig(r, 'router', 'pagination', 'qsKey')], null),
                    [g(params, 0), g(params, 1)]
                ))

            x.saga = loadAllMoviesPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'allMovies', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <AllMovies {...props} currentSection={currentSection}/>
    }}/>

    <Redirect
        exact
        from={ig(r, 'router', 'redirects', 'pornstars', 'from')}
        to={routerGetters.pornstars.link(r)}
    />
    <Route exact path={routerGetters.pornstars.path(r)} render={props => {
        const currentSection = 'pornstars'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadPornstarsPageFlow.bind(null, null)
            x.statusCodeResolver = status500(['app', 'pornstars', 'all', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <Pornstars {...props} currentSection={currentSection}/>
    }}/>
    <Route path={routerGetters.pornstar.path(r)} render={props => {
        const currentSection = 'pornstars'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                qs = queryString.parse(ig(r, 'location', 'search')),
                {match: {params}, staticContext: x} = props,
                action = pornstarActions.loadPageRequest(localizedGetSubPage(r)(
                    g(params, 'child'),
                    get(qs, [ig(r, 'router', 'ordering', 'qsKey')], null),
                    get(qs, [ig(r, 'router', 'pagination', 'qsKey')], null)
                ))

            x.saga = loadPornstarPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'pornstars', 'pornstar', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <Pornstar {...props} currentSection={currentSection}/>
    }}/>

    <Redirect
        exact
        from={ig(r, 'router', 'redirects', 'favorite', 'from')}
        to={routerGetters.favorite.link(r)}
    />
    <Redirect
        exact
        from={ig(r, 'router', 'redirects', 'favorite', 'fromMovies')}
        to={routerGetters.favorite.link(r)}
    />
    <Route exact path={routerGetters.favorite.path(r)} render={props => {
        const currentSection = 'favorite'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadFavoritePageFlow.bind(
                null,
                favoriteActions.loadPageRequest()
            )
            x.statusCodeResolver = status500(['app', 'favorite', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <Favorite {...props} currentSection={currentSection}/>
    }}/>

    <Redirect
        exact
        from={ig(r, 'router', 'redirects', 'favoritePornstars', 'from')}
        to={routerGetters.favoritePornstars.link(r)}
    />
    <Route path={routerGetters.favoritePornstars.path(r)} render={props => {
        const currentSection = 'favorite'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const {staticContext: x} = props
            x.saga = loadFavoritePornstarsPageFlow.bind(
                null,
                favoritePornstarsActions.loadPageRequest()
            )
            x.statusCodeResolver = status500(['app', 'favorite', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <FavoritePornstars {...props} currentSection={currentSection}/>
    }}/>

    <Redirect
        exact
        from={routerGetters.video.redirectFrom(r)}
        to={routerGetters.video.path(r) /* it must be `path` here, not `link`! */}
    />
    <Route path={routerGetters.video.path(r)} render={props => {
        const currentSection = 'allMovies'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match: {params}, staticContext: x} = props,
                action = videoPageActions.loadPageRequest(
                    localizedGetSubPage(r)(`${params.child}/${params.name}`)
                )

            x.saga = loadVideoPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', 'videoPage', 'isFailed'])
            x.currentSection = currentSection
            return null
        } else
            return <VideoPage {...props} currentSection={currentSection}/>
    }}/>

    <Route exact path={routerGetters.findVideos.path(r)} render={props => {
        const currentSection = 'allMovies'

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                qs = queryString.parse(ig(r, 'location', 'search')),
                action = findVideosActions.loadPageRequest(localizedGetSubPage(r)(
                    null,
                    get(qs, [ig(r, 'router', 'ordering', 'qsKey')], null),
                    get(qs, [ig(r, 'router', 'pagination', 'qsKey')], null)
                ))

            props.staticContext.saga = loadFindVideosPageFlow.bind(null, action)
            props.staticContext.statusCodeResolver = status500(['app', 'findVideos', 'isFailed'])
            props.staticContext.currentSection = currentSection
            return null
        } else
            return <FindVideos {...props} currentSection={currentSection}/>
    }}/>

    <Route render={props => {
        const currentSection = null

        // making real 404 status response on server-side rendering
        if (get(props, ['staticContext', 'isPreRouting'])) {
            props.staticContext.statusCodeResolver = () => 404
            props.staticContext.currentSection = currentSection
            return null
        } else
            return <NotFound {...props} currentSection={currentSection}/>
    }}/>
</Switch>

export default compose(
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: routerContextModel,
    })
)(RouterBuilder)
