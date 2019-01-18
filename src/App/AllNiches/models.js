import {PropTypes, ImmutablePropTypes} from '../helpers'

export const
    nicheItemModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        subPage: PropTypes.string,
        itemsCount: PropTypes.number,
    })
