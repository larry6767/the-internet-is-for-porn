import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {toggleNavigation} from './actions'
import {fromJS} from 'immutable'

export default combineReducers({

    // Navigation UI state reducer
    ui: handleActions({
        [toggleNavigation]: (state, action) => {
            return state.set('currentPage', action.payload)
        }
    }, fromJS({currentPage: 0}))
})
