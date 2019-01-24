import {
    ImmutablePropTypes,
    PropTypes,
} from '../helpers'

import {
    immutablePageTextModel,
    immutableNichesListModel,
    orientationCodes,
} from '../models'

const
    model = process.env.NODE_ENV === 'production' ? null : {
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastOrientationCode: PropTypes.oneOf(orientationCodes),
        pageText: immutablePageTextModel,
        nichesList: immutableNichesListModel,
    },

    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact(model),
    dataModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exactRecordOf(model)

export {
    stateModel,
    dataModel,
}
