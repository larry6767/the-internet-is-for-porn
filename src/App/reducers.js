import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import actions from './actions'
import {fromJS} from 'immutable'
import {getCurrentBreakpoint} from './helpers'
import mainHeaderReducer from './MainHeader/reducers'
import nichesReducer from './AllNiches/reducers'

export default combineReducers({
    mainHeader: mainHeaderReducer,
    niches: nichesReducer,

    ui: handleActions({
        [actions.resize]: (state, action) =>
            state.set('currentBreakpoint', getCurrentBreakpoint(action.payload))
    }, fromJS({currentBreakpoint: getCurrentBreakpoint()}))
})
