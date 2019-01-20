import React from 'react'
import {flatten} from 'lodash'
import {Switch, Redirect, Route} from 'react-router-dom'
import {compose} from 'recompose'

import {immutableProvedGet as ig, setPropTypes} from '../App/helpers'
import {ssrRouterContextModel, orientationCodes} from '../App/models'
import {routerGetters} from '../router-builder'

const
    videoRedirectFrom = r => {
        const
            videoPfx = ig(r, 'router', 'redirects', 'video', 'fromPfx'),
            ext = ig(r, 'router', 'redirects', 'video', 'fromExt')

        return `/${videoPfx}:child/:name${ext}`
    }

const
    // TODO redirects supposed to be splitted for specific orientations (see mapping module),
    //      see page codes mapping in backend-api mapping module to see how it could be done.
    LegacyRedirectsRouterBuilder = ({routerContext: r}) => <Switch>
        {orientationCodes.map(orientationCode => [
            <Route
                key={`${orientationCode}-allNiches`}
                exact
                path={`${ig(r, 'legacyOrientationPrefixes', orientationCode)}/`}
                render={props =>
                    (
                        ig(r, 'location', 'search') !==
                        ig(r, 'router', 'redirects', 'categories', 'search')
                    ) ? null : <Redirect
                        to={routerGetters.allNiches.link(
                            r.set('currentOrientation', orientationCode)
                        )}
                    />
                }
            />,

            <Redirect
                key={`${orientationCode}-allMovies`}
                exact
                from={
                    ig(r, 'legacyOrientationPrefixes', orientationCode) +
                    ig(r, 'router', 'redirects', 'allMovies', 'from')
                }
                to={routerGetters.allMovies.link(r.set('currentOrientation', orientationCode))}
            />,

            <Redirect
                key={`${orientationCode}-pornstars-redirect`}
                exact
                from={
                    ig(r, 'legacyOrientationPrefixes', orientationCode) +
                    ig(r, 'router', 'redirects', 'pornstars', 'from')
                }
                to={routerGetters.pornstars.link(r.set('currentOrientation', orientationCode))}
            />,

            <Redirect
                key={`${orientationCode}-video-redirect`}
                exact
                from={
                    ig(r, 'legacyOrientationPrefixes', orientationCode) +
                    videoRedirectFrom(r)
                }
                to={
                    // it must be `path` here, not `link` (to automatically fill the route masks)!
                    routerGetters.video.path(r, orientationCode)
                }
            />,

            <Redirect
                key={`${orientationCode}-favorite`}
                exact
                from={
                    ig(r, 'legacyOrientationPrefixes', orientationCode) +
                    ig(r, 'router', 'redirects', 'favorite', 'from')
                }
                to={routerGetters.favorite.link(r.set('currentOrientation', orientationCode))}
            />,
            <Redirect
                key={`${orientationCode}-favorite-movies`}
                exact
                from={
                    ig(r, 'legacyOrientationPrefixes', orientationCode) +
                    ig(r, 'router', 'redirects', 'favorite', 'fromMovies')
                }
                to={routerGetters.favorite.link(r.set('currentOrientation', orientationCode))}
            />,
            <Redirect
                key={`${orientationCode}-favorite-pornstars`}
                exact
                from={
                    ig(r, 'legacyOrientationPrefixes', orientationCode) +
                    ig(r, 'router', 'redirects', 'favoritePornstars', 'from')
                }
                to={routerGetters.favoritePornstars.link(
                    r.set('currentOrientation', orientationCode)
                )}
            />,
        ])}
    </Switch>

export default compose(
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: ssrRouterContextModel,
    })
)(LegacyRedirectsRouterBuilder)
