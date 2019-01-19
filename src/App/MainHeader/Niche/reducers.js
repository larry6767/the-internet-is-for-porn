import {fromJS} from 'immutable'

import {
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
    provedHandleActions,
} from '../../helpers'

import {orientationCodes, defaultOrientationCode} from '../../models'
import actions from './actions'

const
    stateModel = ImmutablePropTypes.exact({
        currentOrientation: PropTypes.oneOf(orientationCodes),
    })

export default provedHandleActions(stateModel, {
    [g(actions, 'switchOrientation')]: (state, action) =>
        state.set('currentOrientation', g(action, 'payload')),
    [g(actions, 'setOrientation')]: (state, action) =>
        state.set('currentOrientation', g(action, 'payload')),
}, fromJS({
    currentOrientation: defaultOrientationCode,
}))
