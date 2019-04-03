import {ImmutablePropTypes, PropTypes} from 'src/App/helpers'

import {
    immutablePageTextModel,
    pageRequestParamsModel,
    immutableSponsorsListModel
} from 'src/App/models'

import {immutableVideoItemModel} from 'src/generic/VideoItem/models'

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
        randomWidthList: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.number)),
        sponsorsList: immutableSponsorsListModel,
    })
