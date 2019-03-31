import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import Favorite from 'src/App/Favorite'
import favoriteActions from 'src/App/Favorite/actions'
import {loadFavoritePageFlow} from 'src/App/Favorite/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {defaultOrientationCode} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {FAVORITE} from 'src/App/constants'

// Favorite pages are shared for all orientations, so no need for orientation routes.
// We could implement in the future filters such as "all favorie pornstars/videos" and
// "straight/gay/tranny favorite pornstars/videos" on frontend side only if we refactor that
// cookies for favorites by replacing them with `window.localStorage` while simulating cookies
// for backend (converting passed values in request body in to cookie header).

export default r =>
    <Route exact path={routerGetters.favorite.path(r)} render={props => {
        const currentSection = FAVORITE

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match, staticContext: x} = props,
                orientedR = r.set('currentOrientation', defaultOrientationCode),
                pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                action = favoriteActions.loadPageRequest({pageRequestParams})

            x.saga = loadFavoritePageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', FAVORITE, 'isFailed'])
            x.currentSection = currentSection
            // x.currentOrientation = orientationCode
            return null
        } else
            return <Favorite
                {...props}
                currentSection={currentSection}
                /*orientationCode={orientationCode}*/
            />
    }}/>
