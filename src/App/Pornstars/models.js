import {PropTypes, ImmutablePropTypes} from '../helpers'

export const
    modelInfoModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        key: PropTypes.string,
        value: PropTypes.string,
    })
