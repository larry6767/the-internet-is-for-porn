import {ImmutablePropTypes, PropTypes} from '../../helpers'

import {
    immutablePageTextModel,
    immutableModelsListWithLetterModel,
    pageRequestParamsModel,
} from '../../models'

import {immutableVideoItemModel} from '../../../generic/VideoItem/models'

const
    model = process.env.NODE_ENV === 'production' ? null : {
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        modelInfoIsOpen: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageNumber: PropTypes.number,
        pageText: immutablePageTextModel,
        pagesCount: PropTypes.number,
        sortList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        })),
        currentSort: PropTypes.nullable(PropTypes.string),
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
        modelsList: immutableModelsListWithLetterModel,
        // TODO refactor this below to `ImmutablePropTypes.mapOf(PropTypes.string)`
        modelId: PropTypes.number,
        modelInfo: ImmutablePropTypes.listOf(
            ImmutablePropTypes.exact({
                key: PropTypes.string,
                value: PropTypes.string,
            })
        ),
        modelThumb: PropTypes.string,
    },

    stateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact(model),

    dataModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exactRecordOf(model)

export {
    stateModel,
    dataModel,
}
