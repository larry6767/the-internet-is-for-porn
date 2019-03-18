import {ImmutablePropTypes, PropTypes} from 'src/App/helpers'

import {
    immutablePageTextModel,
    pageRequestParamsModel,
    immutableModelsListModel,
} from 'src/App/models'

export const
    model = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,

            lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),

            pageText: PropTypes.nullable(immutablePageTextModel),
            modelsList: immutableModelsListModel,

            // TODO: get rid of that shit below (pornstars not supposed to have pagination)
            pageNumber: PropTypes.number,
            pagesCount: PropTypes.number,
            itemsCount: PropTypes.number,
        })
