import {handleActions} from 'redux-actions'
import actions from './actions'
import {fromJS} from 'immutable'

export default handleActions({
    [actions.setNewPath]: (state, action) => {
        return state.set('currentPath', action.payload)
    }
}, fromJS({currentPath: 0}))
