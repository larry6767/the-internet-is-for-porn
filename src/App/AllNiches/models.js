import {PropTypes, ImmutablePropTypes} from '../helpers'

export const
    nicheItemModel = ImmutablePropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        subPage: PropTypes.string,
        itemsCount: PropTypes.number,
    })
