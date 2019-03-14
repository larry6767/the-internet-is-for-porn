import {pick, map, get} from 'lodash'

// local libs
import {videoItemModel} from 'src/generic/VideoItem/models'
import {incomingVideoItemModel} from 'ssr/lib/helpers/requests/getFilteredVideoList'

import {plainProvedGet as g, PropTypes, assertPropTypes} from 'src/App/helpers'

import {
    incomingPageTextModel,
    pageTextModel,
    incomingVideoPageTextModel,
    videoPageTextModel,
    getVideoPageText,
} from 'ssr/lib/helpers/requests/getPageText'

import {pornstarInfoModel, pornstarInfoForTableModel} from 'ssr/lib/helpers/requests/getPornstarInfo'
import {sortModel} from 'ssr/lib/helpers/requests/getSortList'
import {modelsListWithLetterModel} from 'ssr/lib/helpers/requests/getModelsList'
import {incomingGalleryModel, publishedTemplateModel} from 'ssr/lib/helpers/requests/getGallery'
import {galleryModel, openGraphDataModel} from 'src/App/VideoPage/models'

import {
    getTagList,
    getTagListByLetters,
    getModelsList,
    getOrderingSortList,
    getFilteredVideoList,
    getPageText,
    getTagArchiveList,
    getArchiveFilms,
    getPornstarInfo,
    getPornstarInfoForTable,
    getGallery,
    getOpenGraphData,
    getSponsorsList,
} from 'ssr/lib/helpers/requests'

export const
    getHomeMap = x => ({
        nichesList: getTagList(x.page.TAGS_INFO.items),
        pornstarsList: getModelsList(
            g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
            g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
            true
        ),
        pageText: getPageText(x.page.PAGE_TEXT),
    }),

    // TODO FIXME: now i'm not shure about getting this data,
    // because on production we have some additional tags(i don't know yet where i should get it)
    // if we'll leave this implementation we need some additional logic,
    // because it's same data for AllNiches and Niche (we don't need to get twice from API)
    getAllNichesMap = x => ({
        tagList: getTagListByLetters(x.page.EXTENDED_TAGS_BY_LETTERS.letters),
        pageText: getPageText(x.page.PAGE_TEXT),
    }),
    // sortBy(
    //     map(
    //         x.page.TAGS_INFO.items,
    //         ({id, name, sub_url, items_count}) => ({
    //             id,
    //             name,
    //             subPage: sub_url,
    //             itemsCount: items_count,
    //         })
    //     ),
    //     o => o.name
    // ),

    getAllMoviesMap = x => {
        const
            sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS')),
            tagArchiveListOlder = pick(g(x, 'page').TAG_ARCHIVE_OLDER, ['month', 'year']),
            tagArchiveListNewer = pick(g(x, 'page').TAG_ARCHIVE_NEWER, ['month', 'year']),
            archiveFilms = get(g(x, 'page', 'ACTIVE_NAV_TABS'), ['tag_archive_gals'], null)

        return {
            tagId: g(x, 'page', 'TAG_ID'),
            currentPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pagesCount: x.page.PAGES_COUNT,
            pageText: getPageText(x.page.PAGE_TEXT),
            sponsorsList: getSponsorsList(g(x, 'page', 'CUSTOM_DATA', 'searchSponsors')),
            tagList: getTagListByLetters(x.page.TAGS_BY_LETTERS.letters),

            tagArchiveList: getTagArchiveList(
                get(g(x, 'page'), ['TAG_ARCHIVE_LIST_FULL'], g(x, 'page', 'TAG_ARCHIVE_LIST')),
                g(x, 'page', 'MONTHS_NAMES')
            ),

            tagArchiveListOlder:
                tagArchiveListOlder && Object.keys(tagArchiveListOlder).length
                    ? tagArchiveListOlder
                    : null,

            tagArchiveListNewer:
                tagArchiveListNewer && Object.keys(tagArchiveListNewer).length
                    ? tagArchiveListNewer
                    : null,

            sortList,
            currentSort:
                g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

            archiveFilms: archiveFilms && getArchiveFilms(archiveFilms),
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(
                g(x, 'page', 'GALS_INFO', 'ids'),
                g(x, 'page', 'GALS_INFO', 'items')
            ),
        }
    },

    getNicheMap = x => {
        const
            sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS')),
            tagArchiveListOlder = pick(g(x, 'page').TAG_ARCHIVE_OLDER, ['month', 'year']),
            tagArchiveListNewer = pick(g(x, 'page').TAG_ARCHIVE_NEWER, ['month', 'year']),
            archiveFilms = get(g(x, 'page', 'ACTIVE_NAV_TABS'), ['tag_archive_gals'], null)

        return {
            tagId: g(x, 'page', 'TAG_ID'),
            currentPage: 'all-niches',
            currentSubPage: g(x, 'page', 'TAG_URL_NAME'),
            pageNumber: g(x, 'page', 'PAGE_NUMBER'),
            pagesCount: g(x, 'page', 'PAGES_COUNT'),
            pageText: getPageText(g(x, 'page', 'PAGE_TEXT')),
            sponsorsList: getSponsorsList(g(x, 'page', 'CUSTOM_DATA', 'searchSponsors')),
            tagList: getTagListByLetters(g(x, 'page', 'TAGS_BY_LETTERS', 'letters')),

            tagArchiveList: getTagArchiveList(
                get(g(x, 'page'), ['TAG_ARCHIVE_LIST_FULL'], g(x, 'page', 'TAG_ARCHIVE_LIST')),
                g(x, 'page', 'MONTHS_NAMES')
            ),

            tagArchiveListOlder:
                tagArchiveListOlder && Object.keys(tagArchiveListOlder).length
                    ? tagArchiveListOlder
                    : null,

            tagArchiveListNewer:
                tagArchiveListNewer && Object.keys(tagArchiveListNewer).length
                    ? tagArchiveListNewer
                    : null,

            sortList,
            currentSort:
                g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

            archiveFilms: archiveFilms && getArchiveFilms(archiveFilms),
            itemsCount: g(x, 'page', 'ITEMS_PER_PAGE'),

            videoList: getFilteredVideoList(
                g(x, 'page', 'GALS_INFO', 'ids'),
                g(x, 'page', 'GALS_INFO', 'items')
            ),
        }
    },

    orderingItemModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        ACTIVE: PropTypes.bool,
        URL: PropTypes.string,
    }).isOptional,

    orderingModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        sort_LATEST: orderingItemModel,
        sort_LONGEST: orderingItemModel,
        sort_POPULAR: orderingItemModel,
        sort_RELEVANT: orderingItemModel,
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

    getPornstarMap = x => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(pornstarModel, x, 'getPornstarMap', 'pornstar page source from backend')

        const
            sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS')),

            pornstarInfoForTable = getPornstarInfoForTable(
                g(x, 'page', 'MODEL_INFO'),
                g(x, 'page', 'MONTHS_NAMES'),
            ),

            result = {
                tagId: g(x, 'page', 'TAG_ID'),
                pageNumber: g(x, 'page', 'PAGE_NUMBER'),
                pageText: getPageText(g(x, 'page', 'PAGE_TEXT')),
                pagesCount: g(x, 'page', 'PAGES_COUNT'),

                sortList,
                currentSort:
                    g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

                itemsCount: g(x, 'page', 'ITEMS_PER_PAGE'),
                videoList: getFilteredVideoList(
                    g(x, 'page', 'GALS_INFO', 'ids'),
                    g(x, 'page', 'GALS_INFO', 'items')
                ),
                modelsList: getModelsList(
                    g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
                    g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
                    true
                ),
                pornstarInfo: getPornstarInfo(g(x, 'page', 'MODEL_INFO')),
                pornstarInfoForTable: g(pornstarInfoForTable, 'data'),
                pornstarInfoForTableKeysOrder: g(pornstarInfoForTable, 'keysOrder'),
            }

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                mappedPornstarModel,
                result,
                'getPornstarMap',
                'mapped pornstar page data'
            )

        return result
    },


    getPornstarsMap = x => ({
        modelsList: getModelsList(
            g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
            g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items')
        ),
        pageText: getPageText(x.page.PAGE_TEXT),
    }),

    getFavoriteMap = x => {
        return {
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(
                g(x, 'page', 'GALS_INFO', 'ids'),
                g(x, 'page', 'GALS_INFO', 'items')
            ),
        }
    },

    getFavoritePornstarsMap = x => {
        return {
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            itemsCount: x.page.ITEMS_PER_PAGE,
            modelsList: map(
                pick(
                    x.page.MODELS_BY_LETTERS_TAGS_INFO,
                    (Object.keys(x.page.MODELS_INFO.items))
                ),
                ({id, name, sub_url, items_count}) => ({
                    id: Number(id),
                    name,
                    subPage: sub_url,
                    itemsCount: Number(items_count),
                    thumb: x.page.MODELS_BY_LETTERS_MODELS_INFO.items[id].thumb_url,
                })
            )
        }
    },

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
    }),

    getVideoPageMap = x => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(videoPageModel, x, 'getVideoPageMap', 'video page source from backend')

        const
            result = {
                openGraphData: getOpenGraphData(g(x, 'page', 'GALLERY'), g(x, 'page', 'PAGE_URL')),
                gallery: getGallery(
                    g(x, 'page', 'GALLERY'),
                    g(x, 'page', 'PAGE_URL'),
                    g(x, 'page', 'TIME_AGO'),
                    g(x, 'page', 'CUSTOM_DATA', 'searchSponsors')
                ),

                pageText: getVideoPageText(g(x, 'page', 'PAGE_TEXT')),

                videoList: getFilteredVideoList(
                    g(x, 'page', 'GALS_INFO', 'ids'),
                    g(x, 'page', 'GALS_INFO', 'items')
                ),
            }

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                mappedVideoPageModel,
                result,
                'getVideoPageMap',
                'mapped video page data'
            )

        return result
    },

    getFindVideosMap = x => {
        const
            sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS')),
            orientationSuggestion = ! (
                x.page.SEARCH_SUGGESTED_CLASS_ID &&
                x.page.SEARCH_SUGGESTED_CLASS_ID !== g(x, 'page', 'CLASS_ID')
            ) ? null :
                Number(g(x, 'page', 'SEARCH_SUGGESTED_CLASS_ID'))

        return {
            orientationSuggestion,
            pageNumber: g(x, 'page', 'PAGE_NUMBER'),
            pageText: getPageText(g(x, 'page', 'PAGE_TEXT')),
            pagesCount: g(x, 'page', 'PAGES_COUNT'),

            sortList,
            currentSort:
                g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(
                g(x, 'page', 'GALS_INFO', 'ids'),
                g(x, 'page', 'GALS_INFO', 'items')
            ),
        }
    },

    getSiteMap = x => {
        const
            sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS'))

        return {
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,

            sortList,
            currentSort:
                g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(
                g(x, 'page', 'GALS_INFO', 'ids'),
                g(x, 'page', 'GALS_INFO', 'items')
            ),
        }
    },

    getNotFoundMap = x => ({
        videoList: getFilteredVideoList(
            g(x, 'page', 'GALS_INFO', 'ids'),
            g(x, 'page', 'GALS_INFO', 'items')
        ),
    })
