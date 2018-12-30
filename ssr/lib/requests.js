import {
    pick,
    map
} from 'lodash'
import rp from 'request-promise-native'

import {backendUrl} from '../config'

import {
    homePageCode,
    allNichesPageCode,
    nichePageCode,
    allMoviesPageCode,
    pornstarsPageCode,
    pornstarPageCode,
    favoritePageCode,
    favoritePornstarsPageCode,
    videoPageCode,
} from '../api-page-codes'

import {
    getTagList,
    getTagListByLetters,
    getModelsList,
    getSortList,
    getFilteredVideoList,
    getPageText,
    getTagArchiveList,
    getArchiveFilms,
    getModelInfo,
} from './helpers/requests'

const
    getHomeMap = x => ({
        nichesList: getTagList(x.page.TAGS_INFO.items),
        pornstarsList: getModelsList(
            x.page.MODELS_BY_LETTERS.letters,
            x.page.MODELS_BY_LETTERS_MODELS_INFO.items
        ),
    }),

    // TODO FIXME: now i'm not shure about getting this data,
    // because on production we have some additional tags(i don't know yet where i should get it)
    // if we'll leave this implementation we need some additional logic,
    // because it's same data for AllNiches and Niche (we don't need to get twice from API)
    getAllNichesMap = x => getTagListByLetters(x.page.TAGS_BY_LETTERS.letters),
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
            sortList = getSortList(x.page.ACTIVE_NAV_TABS, x.page.LANG_ID)

        return {
            currentPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            tagList: getTagListByLetters(x.page.TAGS_BY_LETTERS.letters),
            tagArchiveList: getTagArchiveList(x.page.TAG_ARCHIVE_LIST_FULL, x.page.MONTHS_NAMES),
            tagArchiveListOlder: pick(
                x.page.TAG_ARCHIVE_OLDER,
                ['month', 'year']
            ),
            tagArchiveListNewer: pick(
                x.page.TAG_ARCHIVE_NEWER,
                ['month', 'year']
            ),
            sortList: sortList,
            currentSort: sortList.length ? sortList.find(x => x.active).value : '',
            archiveFilms: getArchiveFilms(x.page.ACTIVE_NAV_TABS.tag_archive_gals),
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(x.page.GALS_INFO.ids, x.page.GALS_INFO.items),
        }
    },

    getNicheMap = x => {
        const
            sortList = getSortList(x.page.ACTIVE_NAV_TABS, x.page.LANG_ID)

        return {
            currentPage: 'all-niches',
            currentSubPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            tagList: getTagListByLetters(x.page.TAGS_BY_LETTERS.letters),
            tagArchiveList: getTagArchiveList(x.page.TAG_ARCHIVE_LIST_FULL, x.page.MONTHS_NAMES),
            tagArchiveListOlder: pick(
                x.page.TAG_ARCHIVE_OLDER,
                ['month', 'year']
            ),
            tagArchiveListNewer: pick(
                x.page.TAG_ARCHIVE_NEWER,
                ['month', 'year']
            ),
            sortList: sortList,
            currentSort: sortList.length ? sortList.find(x => x.active).value : '',
            archiveFilms: getArchiveFilms(x.page.ACTIVE_NAV_TABS.tag_archive_gals),
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(x.page.GALS_INFO.ids, x.page.GALS_INFO.items),
        }
    },

    getPornstarMap = x => {
        const
            sortList = getSortList(x.page.ACTIVE_NAV_TABS, x.page.LANG_ID)

        return {
            currentSubPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            sortList: sortList,
            currentSort: sortList.length ? sortList.find(x => x.active).value : '',
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(x.page.GALS_INFO.ids, x.page.GALS_INFO.items),
            modelsList: getModelsList(
                x.page.MODELS_BY_LETTERS.letters,
                x.page.MODELS_BY_LETTERS_MODELS_INFO.items,
            ),
            modelInfo: getModelInfo(x.page.MODEL_INFO),
            modelThumb: x.page.MODEL_INFO.thumb_url,
        }
    },

    getPornstarsMap = x => {
        return getModelsList(
            x.page.MODELS_BY_LETTERS.letters,
            x.page.MODELS_BY_LETTERS_MODELS_INFO.items
        )
    },

    getFavoriteMap = x => {
        return {
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: getFilteredVideoList(x.page.GALS_INFO.ids, x.page.GALS_INFO.items),
        }
    },

    getFavoritePornstarsMap = x => {
        return {
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            itemsCount: x.page.ITEMS_PER_PAGE,
            pornstarList: map(
                pick(
                    x.page.MODELS_BY_LETTERS_TAGS_INFO,
                    (Object.keys(x.page.MODELS_INFO.items))
                ),
                ({id, name, sub_url, items_count}) => ({
                    id: Number(id),
                    name,
                    subPage: sub_url,
                    itemsCount: items_count,
                    thumb: x.page.MODELS_BY_LETTERS_MODELS_INFO.items[id].thumb_url,
                    sort: x.page.MODELS_BY_LETTERS_MODELS_INFO.items[id].url_galleries.indexOf('latest')
                        ? '?sort=latest'
                        : x.page.MODELS_BY_LETTERS_MODELS_INFO.items[id].url_galleries.indexOf('longest')
                        ? '?sort=longest' : '',
                })
            )
        }
    },

    getVideoPageMap = x => {
        return {
            gallery: x.page.GALLERY,
            pageText: getPageText(x.page.PAGE_TEXT),
            videoList: getFilteredVideoList(x.page.GALS_INFO.ids, x.page.GALS_INFO.items),
        }
    }

export const getPageData = async ({headers, pageCode, subPageCode}) => {
    const
        [params, mapFn] =
            pageCode === homePageCode
            ? [{url: '/', options: {blocks: {
                allTagsBlock: 1,
                modelsABCBlockText: 1,
                modelsABCBlockThumbs: 1,
            }}}, getHomeMap]

            : pageCode === allNichesPageCode
            ? [{url: '/?categories', options: {blocks: {allTagsBlock: 1}}}, getAllNichesMap]

            : pageCode === nichePageCode
            ? [{url: `/${subPageCode}.html`, options: {blocks: {allTagsBlock: 1}}}, getNicheMap]

            : pageCode === allMoviesPageCode
            ? [{
                url: `/${pageCode}${subPageCode}.html`,
                options: {blocks: {allTagsBlock: 1}}
            }, getAllMoviesMap]

            : pageCode === pornstarsPageCode
            ? [{url: `/${pageCode}.html`}, getPornstarsMap]

            : pageCode === pornstarPageCode
            ? [{url: `/${pageCode}/${subPageCode}.html`, options: {blocks: {
                modelsABCBlockText: 1,
                modelsABCBlockThumbs: 1,
            }}}, getPornstarMap]

            : pageCode === favoritePageCode
            ? [{url: `/your-${pageCode}.html`}, getFavoriteMap]

            : pageCode === favoritePornstarsPageCode
            ? [{url: `/your-${pageCode}.html`, options: {blocks: {
                modelsABCBlockThumbs: 1,
            }}}, getFavoritePornstarsMap]

            : pageCode === videoPageCode
            ? [{url: `/${pageCode}-${subPageCode}.htm`}, getVideoPageMap]
            : null

    if (params === null)
        throw new Error(`Unexpected page code: "${pageCode}"`)

    return mapFn(await rp({
        uri: backendUrl,
        method: 'POST',
        headers,
        json: true,
        body: {operation: 'getPageDataByUrl', params},
    }))
}
