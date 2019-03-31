import {get} from 'lodash'
import React from 'react'
import {Route} from 'react-router-dom'

//local libs
import FavoritePornstars from 'src/App/FavoritePornstars'
import favoritePornstarsActions from 'src/App/FavoritePornstars/actions'
import {loadFavoritePornstarsPageFlow} from 'src/App/FavoritePornstars/sagas'

import {plainProvedGet as g, getPageRequestParams} from 'src/App/helpers'
import {defaultOrientationCode} from 'src/App/models'
import status500 from 'src/App/helpers/status500BranchResolver'
import routerGetters from 'src/App/routerGetters'
import {FAVORITE_PORNSTARS} from 'src/App/constants'

// Favorite pages are shared for all orientations, so no need for orientation routes.
// We could implement in the future filters such as "all favorie pornstars/videos" and
// "straight/gay/tranny favorite pornstars/videos" on frontend side only if we refactor that
// cookies for favorites by replacing them with `window.localStorage` while simulating cookies
// for backend (converting passed values in request body in to cookie header).

export default r =>
    <Route path={routerGetters.favoritePornstars.path(r)} render={props => {
        const currentSection = FAVORITE_PORNSTARS

        if (get(props, ['staticContext', 'isPreRouting'])) {
            const
                {match, staticContext: x} = props,
                orientedR = r.set('currentOrientation', defaultOrientationCode),
                pageRequestParams = getPageRequestParams(orientedR, g(match, [])),
                action = favoritePornstarsActions.loadPageRequest({pageRequestParams})

            x.saga = loadFavoritePornstarsPageFlow.bind(null, action)
            x.statusCodeResolver = status500(['app', FAVORITE_PORNSTARS, 'isFailed'])
            x.currentSection = currentSection
            // x.currentOrientation = orientationCode
            return null
        } else
            return <FavoritePornstars
                {...props}
                currentSection={currentSection}
                /*orientationCode={orientationCode}*/
            />
    }}/>
