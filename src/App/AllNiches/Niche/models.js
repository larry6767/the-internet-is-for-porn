import {
    ImmutablePropTypes,
    PropTypes,
} from '../../helpers'

import {
    immutableArchiveFilmsModel,
    immutablePageTextModel,
    immutableNichesListModel,
    pageRequestParamsModel,
} from '../../models'

import {immutableVideoItemModel} from '../../../generic/VideoItem/models'

const
    model = process.env.NODE_ENV === 'production' ? null : {
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,

        currentPage: PropTypes.string,
        currentSubPage: PropTypes.string,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),

        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,

        pageText: immutablePageTextModel,

        tagList: immutableNichesListModel,

        tagArchiveList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            archiveDate: PropTypes.number,
            year: PropTypes.number,
            month: PropTypes.string,
            monthNumber: PropTypes.number,
            itemsCount: PropTypes.number,
            url: PropTypes.string,
        })),

        sortList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        })),

        currentSort: PropTypes.nullable(PropTypes.string),

        archiveFilms: PropTypes.nullable(immutableArchiveFilmsModel),
        tagArchiveListOlder: PropTypes.nullable(ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        })),
        tagArchiveListNewer: PropTypes.nullable(ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        })),

        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    },

    stateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact(model),

    dataModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exactRecordOf(model)

export {
    stateModel,
    dataModel,
}
