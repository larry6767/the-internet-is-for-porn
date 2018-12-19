import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import actions from './actions'
import {fromJS, List} from 'immutable'
import {getCurrentBreakpoint} from './helpers'
import homeReducer from './Home/reducers'
import mainHeaderReducer from './MainHeader/reducers'
import allMoviesReducer from './AllMovies/reducers'
import nichesReducer from './AllNiches/reducers'
import pornstarsReducer from './Pornstars/reducers'
import favoriteReducer from './Favorite/reducers'
import favoritePornstarsReducer from './FavoritePornstars/reducers'

const
    defaultSSR = fromJS({isSSR: false})

export default combineReducers({
    home: homeReducer,
    mainHeader: mainHeaderReducer,
    niches: nichesReducer,
    allMovies: allMoviesReducer,
    pornstars: pornstarsReducer,
    favorite: favoriteReducer,
    favoritePornstars: favoritePornstarsReducer,

    ui: handleActions({
        [actions.resize]: (state, action) =>
            state.set('currentBreakpoint', getCurrentBreakpoint(action.payload)),
        [actions.setFavoriteVideoList]: (state, {payload: favoriteVideoList}) =>
            state.set('favoriteVideoList', List(favoriteVideoList)),
        [actions.addToFavoriteVideoList]: (state, {payload: id}) => {
            const
                currentState = state.get('favoriteVideoList'),
                nextState = currentState.push(id)

            return state.set('favoriteVideoList', nextState)
        },
        [actions.removeFromFavoriteVideoList]: (state, {payload: id}) => {
            const
                currentState = state.get('favoriteVideoList'),
                targetPosition = currentState.indexOf(id)

            return targetPosition !== -1
                ? state.set('favoriteVideoList', currentState.delete(targetPosition))
                : state.set('favoriteVideoList', currentState)
        },
    }, fromJS({
        currentBreakpoint: getCurrentBreakpoint(),
        favoriteVideoList: List(),
    })),

    // static flag to detect if the app is running inside Server-Side Rendering
    ssr: (state = defaultSSR) => state,
})
