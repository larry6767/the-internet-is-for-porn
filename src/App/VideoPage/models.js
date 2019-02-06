import {Record} from 'immutable'

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
    OpenGraphDataRecord = Record({
        title: null,
        thumb: null,
        tags: null,
        duration: null,
    }),

    model = process.env.NODE_ENV === 'production' ? null : {
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageText: immutablePageTextModel,
        modelsList: immutableModelsListModel,
    },

    stateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact(model),

    dataModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exactRecordOf(model)

export {
    stateModel,
    dataModel,
    OpenGraphDataRecord,
}
