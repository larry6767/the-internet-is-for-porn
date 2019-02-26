import {ImmutablePropTypes, PropTypes} from '../helpers'

export const model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
    isSearchShown: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
})
