import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

// local libs
import actions from 'src/App/MainHeader/HDSwitch/actions'

export default handleActions({
    [actions.toggleHd]: (state, action) => state.set('hdState', action.payload)
}, fromJS({hdState: false}))
