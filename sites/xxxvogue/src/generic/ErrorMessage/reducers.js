import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import actions from './actions'

export default
    handleActions({
        [actions.closeErrorMessage]: (state) => state.set('isOpen', false),
        [actions.openErrorMessage]: (state) => state.set('isOpen', true),
    }, fromJS({
        isOpen: false,
    }))
