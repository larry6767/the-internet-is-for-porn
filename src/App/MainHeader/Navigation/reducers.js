import {fromJS} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../../helpers'

import actions from './actions'

const
    stateModel = ImmutablePropTypes.exact({
        currentPath: PropTypes.string,
    })

export default provedHandleActions(stateModel, {
    [g(actions, 'setNewPath')]: (state, {payload}) =>
        state.set('currentPath', payload),
}, fromJS({currentPath: '/'}))
