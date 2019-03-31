import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import Home from 'src/App/Home'
import homeActions from 'src/App/Home/actions'
import {loadHomeFlow} from 'src/App/Home/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {HOME} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
    <Route
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
    />
)
