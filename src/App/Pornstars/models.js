import {PropTypes, ImmutablePropTypes} from '../helpers'

export const
    // TODO refactor this to `ImmutablePropTypes.mapOf(PropTypes.string)`
    modelInfoModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        key: PropTypes.string,
        value: PropTypes.string,
    })
