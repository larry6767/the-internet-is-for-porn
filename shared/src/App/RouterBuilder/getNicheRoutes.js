import {get, flatten} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import Niche from 'src/App/Niche'
import nicheActions from 'src/App/Niche/actions'
import {loadNichePageFlow} from 'src/App/Niche/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {NICHE} from 'src/App/constants'

export default r => flatten(orientationCodes.map(orientationCode => [
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
]))
