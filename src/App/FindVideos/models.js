import {ImmutablePropTypes, PropTypes} from '../helpers'
import {immutablePageTextModel, pageRequestParamsModel} from '../models'
import {immutableVideoItemModel} from '../../generic/VideoItem/models'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        orientationSuggestion: PropTypes.nullable(PropTypes.number),
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageNumber: PropTypes.number,
        pageText: PropTypes.nullable(immutablePageTextModel),
        pagesCount: PropTypes.number,
        sortList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        })),
        currentSort: PropTypes.nullable(PropTypes.string),
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })
