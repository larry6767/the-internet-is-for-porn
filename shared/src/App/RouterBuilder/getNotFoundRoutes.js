import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import NotFound from 'src/App/NotFound'
import notFoundActions from 'src/App/NotFound/actions'
import {loadNotFoundPageFlow} from 'src/App/NotFound/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {orientationCodes} from 'src/App/models'
import routerGetters from 'src/App/routerGetters'
import {NOT_FOUND} from 'src/App/constants'

export default r => orientationCodes.map(orientationCode =>
    <Route
        key={`${orientationCode}-${NOT_FOUND}`}
        path={routerGetters.notFound.path(r, orientationCode)}
        render={props => {
            const currentSection = NOT_FOUND

            if (get(props, ['staticContext', 'isPreRouting'])) {
                const
                    {match, staticContext: x} = props,
                    orientedR = r.set('currentOrientation', orientationCode),
                    pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                    action = notFoundActions.loadPageRequest({pageRequestParams})

                x.saga = loadNotFoundPageFlow.bind(null, action)
                x.statusCodeResolver = () => 404
                x.currentOrientation = orientationCode
                x.currentSection = currentSection
                return null
            } else
                return <NotFound
                    {...props}
                    currentSection={currentSection}
                    orientationCode={orientationCode}
                />
        }}
    />
)
