import {fromJS, List} from 'immutable'

// local libs
import {
    provedHandleActions,
    plainProvedGet as g,
    ImmutablePropTypes,
    PropTypes,
} from 'src/App/helpers'

import actions from 'src/App/MainHeader/Search/actions'

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
