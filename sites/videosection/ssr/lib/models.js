import {set} from 'lodash'

// local libs
import {PropTypes} from 'src/App/helpers'
import {pageKeys} from 'src/App/models'

import {videoItemModel} from 'src/generic/VideoItem/models'
import {incomingVideoItemModel} from 'ssr/lib/helpers/requests/getFilteredVideoList'

import {
    incomingPageTextModel,
    pageTextModel,
    incomingVideoPageTextModel,
    videoPageTextModel,
} from 'ssr/lib/helpers/requests/getPageText'

import {
    pornstarInfoModel,
    pornstarInfoForTableModel
} from 'ssr/lib/helpers/requests/getPornstarInfo'

import {modelsListWithLetterModel} from 'ssr/lib/helpers/requests/getModelsList'

import {sortModel} from 'ssr/lib/helpers/requests/getSortList'

import {incomingGalleryModel, publishedTemplateModel} from 'ssr/lib/helpers/requests/getGallery'
import {galleryModel, openGraphDataModel} from 'src/App/VideoPage/models'

// models for requests
const
    getPageDataParamsOptionsModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        // for now it is the only option we use
        blocks: PropTypes.exact({
            allTagsBlock: PropTypes.number.isOptional,
            extendedTagsBlock: PropTypes.number.isOptional,
            modelsABCBlockText: PropTypes.number.isOptional,
            modelsABCBlockThumbs: PropTypes.number.isOptional,
            updateSponsorURL: PropTypes.number.isOptional,
            updateExtraURL: PropTypes.number.isOptional,
            searchSponsors: PropTypes.number.isOptional,
        }).isOptional,
    }),

    getPageDataParamsModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        url: PropTypes.string,
        options: getPageDataParamsOptionsModel.isOptional,
    })


export const
    getPageDataResultModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exactTuple([
        PropTypes.nullable(getPageDataParamsOptionsModel),
        PropTypes.func, // raw backend response to proper and filtered data map function
    ]),

    getPageDataReqBodyModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        operation: PropTypes.string,
        params: getPageDataParamsModel,
    }),

    getPageDataPageMappingModel = PropTypes.exact(
        pageKeys.reduce((o, k) => set(o, k, getPageDataResultModel), {})
    )


// models for mapFns and ssr/helpers/requests
const
    orderingItemModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        ACTIVE: PropTypes.bool,
        URL: PropTypes.string,
    }).isOptional,

    orderingModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        sort_LATEST: orderingItemModel,
        sort_LONGEST: orderingItemModel,
        sort_POPULAR: orderingItemModel,
        sort_RELEVANT: orderingItemModel,
    })

export const
    homeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            TAGS_INFO: PropTypes.object, // TODO better type
            MODELS_BY_LETTERS: PropTypes.object, // TODO better type
            MODELS_BY_LETTERS_MODELS_INFO: PropTypes.object, // TODO better type
            PAGE_TEXT: incomingPageTextModel,
        }),
    }),

    mappedHomeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        nichesList: PropTypes.arrayOf(PropTypes.object), // TODO better type
        pornstarsList: modelsListWithLetterModel,
        pageText: pageTextModel,
    }),

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
        modelsList: modelsListWithLetterModel,
        pornstarInfo: pornstarInfoModel,
        pornstarInfoForTable: pornstarInfoForTableModel,
    }),

    videoPageModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            GALLERY: incomingGalleryModel,
            PAGE_URL: PropTypes.string,
            TIME_AGO: publishedTemplateModel,
            PAGE_TEXT: incomingVideoPageTextModel,
            GALS_INFO: PropTypes.shape({
                ids: PropTypes.arrayOf(PropTypes.number),
                items: PropTypes.objectOf(incomingVideoItemModel),
            }),
        }),
    }),

    mappedVideoPageModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        openGraphData: openGraphDataModel,
        gallery: galleryModel,
        pageText: videoPageTextModel,
        videoList: PropTypes.arrayOf(videoItemModel),
    })
