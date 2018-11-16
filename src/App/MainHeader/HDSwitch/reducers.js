import {handleActions} from 'redux-actions'
import actions from './actions'
import {fromJS} from 'immutable'

export default handleActions({
    [actions.toggleHd]: (state, action) => state.set('hdState', action.payload)
}, fromJS({hdState: false}))
