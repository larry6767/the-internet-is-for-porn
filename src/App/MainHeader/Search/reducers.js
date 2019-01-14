import {compact} from 'lodash'
import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {plainProvedGet as g} from '../../helpers'
import actions from './actions'

export default handleActions({
        [g(actions, 'setNewSuggestions')]: (state, {payload: suggestions}) => state.merge({
            // 'compact' is for array with a single empty value
            suggestions: List(compact(suggestions)),
        }),

        [g(actions, 'setEmptySuggestions')]: state => state.set('suggestions', List()),
    }, fromJS({
        suggestions: [],
    }))
