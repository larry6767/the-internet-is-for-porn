import React from 'react'
import {map} from 'lodash'
import {Switch, Redirect, Route} from 'react-router-dom'
import {compose} from 'recompose'
import fetch from 'node-fetch'

// local libs
import {
    immutableProvedGet as ig,
    plainProvedGet as g,
    setPropTypes,
} from 'src/App/helpers'

import {ssrRouterContextModel, orientationCodes} from 'src/App/models'
import routerGetters from 'src/App/routerGetters'
import nichesRedirects from 'ssr/fixtures/legacy-redirects/niches-redirects.json'
import pornstarsRedirects from 'ssr/fixtures/legacy-redirects/pornstars-redirects.json'
import {backendUrl} from 'ssr/lib/helpers/backendUrl'
import {proxiedHeaders} from 'ssr/lib/backend-proxy'
import {internalLinkReg} from 'ssr/lib/models'

const
    videoRedirectFrom = r => {
        const
            videoPfx = ig(r, 'router', 'redirects', 'video', 'fromPfx'),
            ext = ig(r, 'router', 'redirects', 'video', 'fromExt')

        return `/${videoPfx}:child/:name${ext}`
    },

    getFrom = (r, orientationCode, section, field = 'from') =>
        ig(r, 'ssr', 'legacyOrientationPrefixes', orientationCode) +
        ig(r, 'router', 'redirects', section, field),

    // TODO temporary solution, because we have different redirects only for AllMovies,
    // and we have more important tasks now
    getFromForAllMovies = (r, orientationCode, section, field = 'from') =>
        ig(r, 'ssr', 'legacyOrientationPrefixes', orientationCode) +
        ig(r, 'router', 'redirects', section, field, orientationCode),

    legacyVideoRedirectFlow = (siteLocales, r, orientationCode) => async req => {
        const
            url = ig(r, 'location', 'pathname'),
            localeCode = ig(r, 'ssr', 'localeCode'),
            videoId = g(url.match(internalLinkReg), 2),

            response = await fetch(backendUrl(siteLocales, localeCode), {
                method: 'POST',
                headers: proxiedHeaders(siteLocales, localeCode)(req),

                body: JSON.stringify({
                    operation: 'getPageDataByUrl',
                    params: {url},
                }),
            })

        if (response.ok)
            return routerGetters.video.link(
                r,
                videoId,
                g(await response.json(), 'page', 'GALLERY', 'title')
            )
        else
            throw new Error(`Response is not OK (status code is ${response.status})`)
    }

const
    // TODO redirects supposed to be splitted for specific orientations (see mapping module),
    //      see page codes mapping in backend-api mapping module to see how it could be done.
    LegacyRedirectsRouterBuilder = ({routerContext: r, siteLocales}) => <Switch>
        {orientationCodes.map(orientationCode => {
            const
                orientedR = r.set('currentOrientation', orientationCode),
                nichesBranch = g(nichesRedirects, ig(r, 'ssr', 'localeCode'), orientationCode),

                nichesRedirectsList = map(nichesBranch, (to, from) => <Redirect
                    key={`${orientationCode}-${to}-niche`}
                    exact
                    from={decodeURIComponent(from)}
                    to={routerGetters.niche.link(orientedR, to)}
                />),

                pornstarsBranch =
                    g(pornstarsRedirects, ig(r, 'ssr', 'localeCode'), orientationCode),

                pornstarsRedirectsList = map(pornstarsBranch, (to, from) => <Redirect
                    key={`${orientationCode}-${to}-niche`}
                    exact
                    from={decodeURIComponent(from)}
                    to={routerGetters.pornstar.link(orientedR, to)}
                />)

            return nichesRedirectsList.concat(
                pornstarsRedirectsList
            ).concat([
                <Route
                    key={`${orientationCode}-allNiches`}
                    exact
                    path={`${ig(r, 'ssr', 'legacyOrientationPrefixes', orientationCode)}/`}
                    render={props =>
                        (
                            ig(r, 'location', 'search') !==
                            ig(r, 'router', 'redirects', 'categories', 'search')
                        ) ? null : <Redirect
                            to={routerGetters.allNiches.link(orientedR)}
                        />
                    }
                />,

                <Redirect
                    key={`${orientationCode}-allMovies`}
                    exact
                    from={getFromForAllMovies(r, orientationCode, 'allMovies')}
                    to={routerGetters.allMovies.link(orientedR)}
                />,

                <Redirect
                    key={`${orientationCode}-pornstars-redirect`}
                    exact
                    from={getFrom(r, orientationCode, 'pornstars')}
                    to={routerGetters.pornstars.link(orientedR)}
                />,

                <Route
                    key={`${orientationCode}-video-redirect`}
                    exact
                    path={
                        ig(r, 'ssr', 'legacyOrientationPrefixes', orientationCode) +
                        videoRedirectFrom(r)
                    }
                    render={props => {
                        props.staticContext.legacyRedirectFlow =
                            legacyVideoRedirectFlow(siteLocales, orientedR, orientationCode)

                        return null
                    }}
                />,

                <Redirect
                    key={`${orientationCode}-favorite`}
                    exact
                    from={getFrom(r, orientationCode, 'favorite')}
                    to={routerGetters.favorite.link(orientedR)}
                />,
                <Redirect
                    key={`${orientationCode}-favorite-movies`}
                    exact
                    from={getFrom(r, orientationCode, 'favorite', 'fromMovies')}
                    to={routerGetters.favorite.link(orientedR)}
                />,
                <Redirect
                    key={`${orientationCode}-favorite-pornstars`}
                    exact
                    from={getFrom(r, orientationCode, 'favoritePornstars')}
                    to={routerGetters.favoritePornstars.link(orientedR)}
                />,
            ])
        })}
    </Switch>

export default compose(
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: ssrRouterContextModel,
    })
)(LegacyRedirectsRouterBuilder)
