import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import FindVideos from 'src/App/FindVideos'
import findVideosActions from 'src/App/FindVideos/actions'
import {loadFindVideosPageFlow} from 'src/App/FindVideos/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {FIND_VIDEOS} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
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
)
