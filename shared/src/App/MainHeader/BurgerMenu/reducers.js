import {fromJS} from 'immutable'

// local libs
import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from 'src/App/helpers'

import actions from 'src/App/MainHeader/BurgerMenu/actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isOpened: PropTypes.bool,
    })

export default provedHandleActions(stateModel, {
    [g(actions, 'open')]: (state, {payload}) => state.set('isOpened', true),
    [g(actions, 'close')]: state => state.set('isOpened', false)
}, fromJS({isOpened: false}))
