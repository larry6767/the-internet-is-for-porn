import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {getInititalData} from './actions'

export default combineReducers({

    // VideoList UI state reducer
    ui: handleActions({
        [getInititalData]: (state, action) => {
            console.log('getInititalData')
        }
    }, fromJS({niches: {}}))
})
