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
        currentPath: PropTypes.string,
    })

export default provedHandleActions(stateModel, {
    [g(actions, 'setNewPath')]: (state, {payload}) => state.set('currentPath', payload),
}, fromJS({currentPath: '/'}))
