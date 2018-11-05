import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {toggleHD} from './actions'
import {fromJS} from 'immutable'

export default combineReducers({

    // HD UI state reducer
    ui: handleActions({
        [toggleHD]: (state, action) => state.set('HD', action.payload)
    }, fromJS({HD: false}))
})
