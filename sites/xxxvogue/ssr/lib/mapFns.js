import {pick, map, get} from 'lodash'

// local libs
import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'

import {
    getNichesList,
    getNichesListByLetters,
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
    getVideoPageText,
} from 'ssr/lib/helpers/requests'

import {
    homeModel,
    mappedHomeModel,
    pornstarModel,
    mappedPornstarModel,
    videoPageModel,
    mappedVideoPageModel,
} from 'ssr/lib/models'

export const
    getHomeMap = x => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(homeModel, x, 'getHomeMap', 'home page source from backend')

        const
            result = {
                nichesWithThumbsList: getNichesList(g(x, 'page', 'TAGS_INFO', 'items'), 12, true),
                nichesList: getNichesList(g(x, 'page', 'TAGS_INFO', 'items')),
                pornstarsList: getModelsList(
                    g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
                    g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
                    true
                ),
                pageText: getPageText(g(x, 'page', 'PAGE_TEXT'))
            }

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                mappedHomeModel,
                result,
                'getHomeMap',
                'mapped home page data'
            )

        return result
    },

    // TODO FIXME: now i'm not shure about getting this data,
    // because on production we have some additional tags(i don't know yet where i should get it)
    // if we'll leave this implementation we need some additional logic,
    // because it's same data for AllNiches and Niche (we don't need to get twice from API)
    getAllNichesMap = x => ({
        tagList: getNichesListByLetters(x.page.TAGS_BY_LETTERS.letters),
        pageText: getPageText(x.page.PAGE_TEXT),
    }),

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
            tagList: getNichesListByLetters(x.page.TAGS_BY_LETTERS.letters),

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
            tagList: getNichesListByLetters(g(x, 'page', 'TAGS_BY_LETTERS', 'letters')),

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
