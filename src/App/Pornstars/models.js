import {PropTypes, ImmutablePropTypes} from '../helpers'

export const
    modelsListModel = ImmutablePropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        subPage: PropTypes.string,
        itemsCount: PropTypes.number,
        thumb: PropTypes.string,
    }),
    modelInfoModel = ImmutablePropTypes.exact({
        key: PropTypes.string,
        value: PropTypes.string,
    })
