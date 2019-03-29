import {get, flatten} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import AllMovies from 'src/App/AllMovies'
import allMoviesActions from 'src/App/AllMovies/actions'
import {loadAllMoviesPageFlow} from 'src/App/AllMovies/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {ALL_MOVIES} from 'src/App/constants'

export default r => flatten(orientationCodes.map(orientationCode => [
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
]))
