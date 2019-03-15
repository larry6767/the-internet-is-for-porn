import {fromJS} from 'immutable'

// local libs
import {
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
    provedHandleActions,
} from 'src/App/helpers'

import {orientationCodes, defaultOrientationCode} from 'src/App/models'
import actions from 'src/App/MainHeader/Niche/actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
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
