// TODO need to finish model
import {
    ImmutablePropTypes,
    PropTypes,
} from '../helpers'

import {
    immutablePageTextModel,
    immutableModelsListModel,
    pageRequestParamsModel,
} from '../models'

const
    immutableOpenGraphDataModel = ImmutablePropTypes.exact({
        title: PropTypes.string,
        thumb: PropTypes.string,
        tags: ImmutablePropTypes.listOf(PropTypes.string),
        duration: PropTypes.string,
    })

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageText: immutablePageTextModel,
        modelsList: immutableModelsListModel,
        openGraphData: immutableOpenGraphDataModel,
    })
