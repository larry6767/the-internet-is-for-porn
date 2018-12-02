import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import actions from './actions'
import {fromJS} from 'immutable'
import {getCurrentBreakpoint} from './helpers'
import mainHeaderReducer from './MainHeader/reducers'
import allMoviesReducer from './AllMovies/reducers'
import nichesReducer from './AllNiches/reducers'
import pornstarsReducer from './Pornstars/reducers'

const
    defaultSSR = fromJS({isSSR: false})

export default combineReducers({
    mainHeader: mainHeaderReducer,
    niches: nichesReducer,
    allMovies: allMoviesReducer,
    pornstars: pornstarsReducer,

    ui: handleActions({
        [actions.resize]: (state, action) =>
            state.set('currentBreakpoint', getCurrentBreakpoint(action.payload))
    }, fromJS({currentBreakpoint: getCurrentBreakpoint()})),

    // static flag to detect if the app is running inside Server-Side Rendering
    ssr: (state = defaultSSR) => state,
})
