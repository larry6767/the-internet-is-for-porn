import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {openBurgerMenu, closeBurgerMenu} from './actions'
import {fromJS} from 'immutable'

export default combineReducers({

    // BurgerMenu UI state reducer
    ui: handleActions({
        [openBurgerMenu]: (state, action) => state.set('anchorEl', action.payload.currentTarget),
        [closeBurgerMenu]: state => state.set('anchorEl', undefined)
    }, fromJS({anchorEl: undefined}))
})
