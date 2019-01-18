import {fromJS} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../../helpers'

import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        currentSection: PropTypes.nullable(PropTypes.string),
    })

export default provedHandleActions(stateModel, {
    [g(actions, 'setCurrentSection')]: (state, action) =>
        state.set('currentSection', g(action, 'payload')),
}, fromJS({
    currentSection: null,
}))
