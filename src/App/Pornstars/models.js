import {PropTypes, ImmutablePropTypes} from '../helpers'

export const
    modelsListModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        subPage: PropTypes.string,
        itemsCount: PropTypes.number,
        thumb: PropTypes.string,
    }),
    modelInfoModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        key: PropTypes.string,
        value: PropTypes.string,
    })
