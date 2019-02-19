import {ImmutablePropTypes, PropTypes} from '../helpers'

import {
    immutablePageTextModel,
    immutableModelsListModel,
    pageRequestParamsModel,
} from '../models'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageText: immutablePageTextModel,
        modelsList: immutableModelsListModel,
    })
