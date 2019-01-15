import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {plainProvedGet as g} from '../../helpers'
import actions from './actions'

export default handleActions({
        [g(actions, 'setNewSuggestions')]: (state, {payload: suggestions}) => state.merge({
            suggestions: List(suggestions),
        }),

        [g(actions, 'setEmptySuggestions')]: state => state.set('suggestions', List()),
    }, fromJS({
        suggestions: [],
    }))
