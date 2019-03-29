import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import Site from 'src/App/Site'
import siteActions from 'src/App/Site/actions'
import {loadSitePageFlow} from 'src/App/Site/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {SITE} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
    <Route
        key={`${orientationCode}-${SITE}`}
        exact
        path={routerGetters.site.path(r, orientationCode)}
        render={props => {
            const currentSection = SITE

            if (get(props, ['staticContext', 'isPreRouting'])) {
                const
                    {match, staticContext: x} = props,
                    orientedR = r.set('currentOrientation', orientationCode),
                    pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                    action = siteActions.loadPageRequest({pageRequestParams})

                x.saga = loadSitePageFlow.bind(null, action)
                x.statusCodeResolver = status500(['app', SITE, 'isFailed'])
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
)
