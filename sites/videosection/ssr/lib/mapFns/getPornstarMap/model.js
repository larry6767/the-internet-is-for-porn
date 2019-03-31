import {PropTypes} from 'src/App/helpers'
import {videoItemModel} from 'src/generic/VideoItem/models'
import {incomingVideoItemModel} from 'ssr/lib/helpers/mapFns/getFilteredVideoList'
import {incomingPageTextModel, pageTextModel} from 'ssr/lib/helpers/mapFns/getPageText'

import {
    pornstarInfoModel,
    pornstarInfoForTableModel
} from 'ssr/lib/helpers/mapFns/getPornstarInfo'

import {pornstarsListWithLetterModel} from 'ssr/lib/helpers/mapFns/getPornstarsList'
import {sortModel} from 'ssr/lib/helpers/mapFns/getSortList'
import {orderingModel} from 'ssr/lib/models'


export const
    pornstarModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            ACTIVE_NAV_TABS: orderingModel,
            PAGE_NUMBER: PropTypes.number,
            PAGE_TEXT: incomingPageTextModel,
            PAGES_COUNT: PropTypes.number,
            ITEMS_PER_PAGE: PropTypes.number,
            GALS_INFO: PropTypes.shape({
                ids: PropTypes.object, // TODO better type
                items: PropTypes.objectOf(incomingVideoItemModel),
            }),
            MODELS_BY_LETTERS: PropTypes.object, // TODO better type
            MODELS_BY_LETTERS_MODELS_INFO: PropTypes.object, // TODO better type
        }),
    }),

    mappedPornstarModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        tagId: PropTypes.number,
        pageNumber: PropTypes.number,
        pageText: pageTextModel,
        pagesCount: PropTypes.number,
        sortList: sortModel,
        currentSort: PropTypes.string,
        itemsCount: PropTypes.number,
        videoList: PropTypes.arrayOf(videoItemModel),
        modelsList: pornstarsListWithLetterModel,
        pornstarInfo: pornstarInfoModel,
        pornstarInfoForTable: pornstarInfoForTableModel,
    })
