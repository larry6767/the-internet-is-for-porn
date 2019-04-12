import {ImmutablePropTypes, PropTypes} from 'src/App/helpers'

import {
    immutableArchiveFilmsModel,
    immutablePageTextModel,
    immutableNichesListModel,
    pageRequestParamsModel,
    immutableTagArchiveListModel,
    immutableSortListModel,
    immutableTagArchiveListOlderOrNewerModel,
    immutableSponsorsListModel,
} from 'src/App/models'

import {immutableVideoItemModel} from 'src/generic/VideoItem/models'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        tagId: PropTypes.number,
        currentPage: PropTypes.string,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageNumber: PropTypes.number,
        pageText: PropTypes.nullable(immutablePageTextModel),
        pagesCount: PropTypes.number,
        sponsorsList: immutableSponsorsListModel,
        tagList: immutableNichesListModel,
        tagArchiveList: immutableTagArchiveListModel,
        sortList: immutableSortListModel,
        currentSort: PropTypes.nullable(PropTypes.string),
        archiveFilms: PropTypes.nullable(immutableArchiveFilmsModel),
        tagArchiveListOlder: immutableTagArchiveListOlderOrNewerModel,
        tagArchiveListNewer: immutableTagArchiveListOlderOrNewerModel,
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })
