import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import Pornstar from 'src/App/Pornstar'
import pornstarActions from 'src/App/Pornstar/actions'
import {loadPornstarPageFlow} from 'src/App/Pornstar/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {PORNSTAR} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
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
    />
)
