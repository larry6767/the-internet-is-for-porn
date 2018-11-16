import {handleActions} from 'redux-actions'
import actions from './actions'
import {fromJS} from 'immutable'

export default handleActions({
    [actions.open]: (state, action) => state.set('anchorEl', action.payload.currentTarget),
    [actions.close]: state => state.set('anchorEl', undefined)
}, fromJS({anchorEl: undefined}))
