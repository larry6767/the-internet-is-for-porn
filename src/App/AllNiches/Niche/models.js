import {ImmutablePropTypes, PropTypes} from '../../helpers'

import {
    immutableArchiveFilmsModel,
    immutablePageTextModel,
    immutableNichesListModel,
    pageRequestParamsModel,
    immutableTagArchiveListModel,
    immutableSortListModel,
    immutableTagArchiveListOlderOrNewerModel,
} from '../../models'

import {immutableVideoItemModel} from '../../../generic/VideoItem/models'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        tagId: PropTypes.number,
        currentPage: PropTypes.string,
        currentSubPage: PropTypes.string,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,
        pageText: immutablePageTextModel,
        sponsorsList: ImmutablePropTypes.listOf(PropTypes.string),
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
