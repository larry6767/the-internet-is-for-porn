import {ImmutablePropTypes, PropTypes} from 'src/App/helpers'

import {
    immutablePageTextModel,
    immutableNichesListWithThumbModel,
    immutablePornstarsListWithLetterModel,
    pageRequestParamsModel,
} from 'src/App/models'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageText: PropTypes.nullable(immutablePageTextModel),
        nichesList: immutableNichesListWithThumbModel,
        pornstarsList: immutablePornstarsListWithLetterModel,
    })
