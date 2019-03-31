import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import Pornstars from 'src/App/Pornstars'
import pornstarsActions from 'src/App/Pornstars/actions'
import {loadPornstarsPageFlow} from 'src/App/Pornstars/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {PORNSTARS} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
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
    />
)
