import {fromJS, List} from 'immutable'

import {
    provedHandleActions,
    plainProvedGet as g,
    ImmutablePropTypes,
    PropTypes,
} from '../../helpers'

import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        suggestions: ImmutablePropTypes.listOf(PropTypes.string),
    })

export default provedHandleActions(stateModel, {
        [g(actions, 'setNewSuggestions')]: (state, {payload: suggestions}) => state.merge({
            suggestions: List(suggestions),
        }),

        [g(actions, 'setEmptySuggestions')]: state => state.set('suggestions', List()),
    }, fromJS({
        suggestions: [],
    }))
