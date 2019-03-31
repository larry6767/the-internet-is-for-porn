import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import VideoPage from 'src/App/VideoPage'
import videoPageActions from 'src/App/VideoPage/actions'
import {loadVideoPageFlow} from 'src/App/VideoPage/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {VIDEO} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
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
)
