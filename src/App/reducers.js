import {combineReducers} from 'redux-immutable'
import {fromJS, List, Map} from 'immutable'

import {
    getCurrentBreakpoint,
    addIdToFavoriteList,
    removeIdFromFavoriteList,
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
    provedHandleActions,
} from './helpers'

import homeReducer from './Home/reducers'
import mainHeaderReducer from './MainHeader/reducers'
import allMoviesReducer from './AllMovies/reducers'
import allNichesReducer from './AllNiches/reducers'
import nicheReducer from './Niche/reducers'
import pornstarsReducer from './Pornstars/reducers'
import pornstarReducer from './Pornstar/reducers'
import favoriteReducer from './Favorite/reducers'
import favoritePornstarsReducer from './FavoritePornstars/reducers'
import videoPageReducer from './VideoPage/reducers'
import findVideosReducer from './FindVideos/reducers'
import siteReducer from './Site/reducers'
import notFoundReducer from './NotFound/reducers'
import reportDialogReducer from './ReportDialog/reducers'
import actions from './actions'
import {immutableLocaleRouterModel, immutableI18nModel} from './models'

import {
    HOME,
    ALL_NICHES,
    NICHE,
    ALL_MOVIES,
    PORNSTARS,
    PORNSTAR,
    FAVORITE,
    FAVORITE_PORNSTARS,
    VIDEO,
    FIND_VIDEOS,
    SITE,
    NOT_FOUND,
} from './constants'

const
    defaultSSR = fromJS({isSSR: false}),
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        currentWidth: PropTypes.number,
        currentBreakpoint: PropTypes.string,
        favoriteVideoList: ImmutablePropTypes.listOf(PropTypes.number),
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),
    })

export default combineReducers({
    // some values are constants (actually only pages) because
    // we use them for many cases with 'currentSection' and want to avoid human typo
    [HOME]: homeReducer,
    mainHeader: mainHeaderReducer,
    [ALL_NICHES]: allNichesReducer,
    [NICHE]: nicheReducer,
    [ALL_MOVIES]: allMoviesReducer,
    [PORNSTARS]: pornstarsReducer,
    [PORNSTAR]: pornstarReducer,
    [FAVORITE]: favoriteReducer,
    [FAVORITE_PORNSTARS]: favoritePornstarsReducer,
    [VIDEO]: videoPageReducer,
    [FIND_VIDEOS]: findVideosReducer,
    [SITE]: siteReducer,
    [NOT_FOUND]: notFoundReducer,
    reportDialog: reportDialogReducer,

    ui: provedHandleActions(stateModel, {
        [g(actions, 'resize')]: (state, action) => state.merge({
            currentWidth: action.payload,
            currentBreakpoint: getCurrentBreakpoint(action.payload),
        }),

        [g(actions, 'setFavoriteVideoList')]: (state, {payload: favoriteVideoList}) =>
            state.set('favoriteVideoList', List(favoriteVideoList)),
        [g(actions, 'addVideoIdToFavorite')]: (state, {payload: id}) =>
            addIdToFavoriteList(state, 'favoriteVideoList', id),
        [g(actions, 'removeVideoIdFromFavorite')]: (state, {payload: id}) =>
            removeIdFromFavoriteList(state, 'favoriteVideoList', id),

        [g(actions, 'setFavoritePornstarList')]: (state, {payload: favoritePornstarList}) =>
            state.set('favoritePornstarList', List(favoritePornstarList)),
        [g(actions, 'addPornstarIdToFavorite')]: (state, {payload: id}) =>
            addIdToFavoriteList(state, 'favoritePornstarList', id),
        [g(actions, 'removePornstarIdFromFavorite')]: (state, {payload: id}) =>
            removeIdFromFavoriteList(state, 'favoritePornstarList', id),
    }, fromJS({
        currentWidth: 0,
        currentBreakpoint: getCurrentBreakpoint(),
        favoriteVideoList: List(),
        favoritePornstarList: List(),
    })),

    // static flag to detect if the app is running inside Server-Side Rendering
    ssr: (state = defaultSSR) => state,

    locale: combineReducers({
        localeCode: provedHandleActions(
            process.env.NODE_ENV === 'production' ? null : PropTypes.nullable(PropTypes.string),
            {[g(actions, 'setLocaleCode')]: (state, {payload}) => payload},
            null
        ),

        // This supposed to be filled at initialization step (depending on current locale).
        router: provedHandleActions(
            process.env.NODE_ENV === 'production' ? null :
                PropTypes.nullable(immutableLocaleRouterModel),
            {[g(actions, 'fillLocaleRouter')]: (state, {payload}) => Map(fromJS(payload))},
            null
        ),

        // This supposed to be filled at initialization step (depending on current locale).
        i18n: provedHandleActions(
            process.env.NODE_ENV === 'production' ? null : PropTypes.nullable(immutableI18nModel),
            {[g(actions, 'fillLocaleI18n')]: (state, {payload}) => Map(fromJS(payload))},
            null
        ),
    }),
})
