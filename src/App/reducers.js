import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {fromJS, List, Map} from 'immutable'

import {
    getCurrentBreakpoint,
    addIdToFavoriteList,
    removeIdFromFavoriteList,
    plainProvedGet as g,
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
} from './helpers'

import homeReducer from './Home/reducers'
import mainHeaderReducer from './MainHeader/reducers'
import allMoviesReducer from './AllMovies/reducers'
import nichesReducer from './AllNiches/reducers'
import pornstarsReducer from './Pornstars/reducers'
import favoriteReducer from './Favorite/reducers'
import favoritePornstarsReducer from './FavoritePornstars/reducers'
import videoPageReducer from './VideoPage/reducers'
import findVideosReducer from './FindVideos/reducers'
import actions from './actions'
import {immutableLocaleRouterModel, immutableI18nModel} from './models'

const
    defaultSSR = fromJS({isSSR: false}),

    localePageCodeModel = ImmutablePropTypes.exact({
        home: PropTypes.string,
        allNiches: PropTypes.string,
        niche: PropTypes.string,
        allMovies: PropTypes.string,
        pornstars: PropTypes.string,
        pornstar: PropTypes.string,
        favorite: PropTypes.string,
        favoritePornstars: PropTypes.string,
        video: PropTypes.string,
        findVideos: PropTypes.string,
    })

export default combineReducers({
    home: homeReducer,
    mainHeader: mainHeaderReducer,
    niches: nichesReducer,
    allMovies: allMoviesReducer,
    pornstars: pornstarsReducer,
    favorite: favoriteReducer,
    favoritePornstars: favoritePornstarsReducer,
    videoPage: videoPageReducer,
    findVideos: findVideosReducer,

    ui: handleActions({
        [g(actions, 'resize')]: (state, action) =>
            state.set('currentBreakpoint', getCurrentBreakpoint(action.payload)),

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
        currentBreakpoint: getCurrentBreakpoint(),
        favoriteVideoList: List(),
        favoritePornstarList: List(),
    })),

    // static flag to detect if the app is running inside Server-Side Rendering
    ssr: (state = defaultSSR) => state,

    locale: combineReducers({
        localeCode: provedHandleActions(PropTypes.string.isOptional, {
            [g(actions, 'setLocaleCode')]: (state, {payload}) => payload,
        }, null),

        // This supposed to be filled at initialization step (depending on current locale).
        pageCode: provedHandleActions(localePageCodeModel.isOptional, {
            [g(actions, 'fillLocalePageCodes')]: (state, {payload}) => Map(fromJS(payload)),
        }, null),

        // This supposed to be filled at initialization step (depending on current locale).
        router: provedHandleActions(immutableLocaleRouterModel.isOptional, {
            [g(actions, 'fillLocaleRouter')]: (state, {payload}) => Map(fromJS(payload)),
        }, null),

        // This supposed to be filled at initialization step (depending on current locale).
        i18n: provedHandleActions(immutableI18nModel.isOptional, {
            [g(actions, 'fillLocaleI18n')]: (state, {payload}) => Map(fromJS(payload)),
        }, null),
    }),
})
