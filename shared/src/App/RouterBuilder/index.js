import React from 'react'
import {Switch} from 'react-router-dom'
import {compose} from 'recompose'

// local libs
import {setPropTypes} from 'src/App/helpers'
import {routerContextModel} from 'src/App/models'

import getHomeRoutes from 'src/App/RouterBuilder/getHomeRoutes'
import getAllNichesRoutes from 'src/App/RouterBuilder/getAllNichesRoutes'
import getNicheRoutes from 'src/App/RouterBuilder/getNicheRoutes'
import getAllMoviesRoutes from 'src/App/RouterBuilder/getAllMoviesRoutes'
import getPornstarsRoutes from 'src/App/RouterBuilder/getPornstarsRoutes'
import getPornstarRoutes from 'src/App/RouterBuilder/getPornstarRoutes'
import getFavoriteRoutes from 'src/App/RouterBuilder/getFavoriteRoutes'
import getFavoritePornstarsRoutes from 'src/App/RouterBuilder/getFavoritePornstarsRoutes'
import getVideoRoutes from 'src/App/RouterBuilder/getVideoRoutes'
import getFindVideosRoutes from 'src/App/RouterBuilder/getFindVideosRoutes'
import getSiteRoutes from 'src/App/RouterBuilder/getSiteRoutes'
import getNotFoundRoutes from 'src/App/RouterBuilder/getNotFoundRoutes'

// `staticContext` is for only for Server-Side Rendering here.
// `staticContext.isPreRouting` means we don't need to render any component
// (using just `null` plugs) but to just prepare meta info for SSR
// (such as status code, action to dispatch).
const RouterBuilder = ({routerContext: r}) => <Switch>
    {getHomeRoutes(r)}
    {getAllNichesRoutes(r)}
    {getNicheRoutes(r)}
    {getAllMoviesRoutes(r)}
    {getPornstarsRoutes(r)}
    {getPornstarRoutes(r)}
    {getFavoriteRoutes(r)}
    {getFavoritePornstarsRoutes(r)}
    {getVideoRoutes(r)}
    {getFindVideosRoutes(r)}
    {getSiteRoutes(r)}
    {getNotFoundRoutes(r)}
</Switch>

export default compose(
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: routerContextModel,
    })
)(RouterBuilder)
