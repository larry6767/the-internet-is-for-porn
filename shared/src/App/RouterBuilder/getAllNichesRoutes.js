import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import AllNiches from 'src/App/AllNiches'
import allNichesActions from 'src/App/AllNiches/actions'
import {loadAllNichesPageFlow} from 'src/App/AllNiches/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {ALL_NICHES} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
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
    />
)
