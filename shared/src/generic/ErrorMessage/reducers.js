import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

// local libs
import actions from 'src/generic/ErrorMessage/actions'

export default
    handleActions({
        [actions.closeErrorMessage]: (state) => state.set('isOpen', false),
        [actions.openErrorMessage]: (state) => state.set('isOpen', true),
    }, fromJS({
        isOpen: false,
    }))
