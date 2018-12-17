import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import actions from './actions'

export default
    handleActions({
        [actions.addToFavorite]: (state, {payload: {id}}) => state.set('isOpen', false),
        [actions.removeFromFavorite]: (state, {payload: {id}}) => state.set('isOpen', true),
    }, fromJS({
        isOpen: false,
    }))
