import {
    pick,
    map,
} from 'lodash'
import rp from 'request-promise-native'
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
import {backendUrl} from '../config'

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
            modelsList: map(
                x.page.MODELS_INFO.items,
                ({id, name, sub_url, items_count}) => ({
                    id,
                    name,
                    subPage: sub_url,
                    itemsCount: items_count,
                    thumb: items[id].thumb_url,
                    sort: items[id].url_galleries.indexOf('latest')
                        ? '?sort=latest'
                        : items[id].url_galleries.indexOf('longest')
                        ? '?sort=longest' : '',
                    letter: key,
                })
            )
        }
    }

// sort of enum (to reduce human-factor mistakes).
// required suffix: `PageCode`.
export const
    homePageCode = 'home',
    allNichesPageCode = 'all-niches',
    nichePageCode = 'niche',
    allMoviesPageCode = 'all-movies',
    pornstarsPageCode = 'porn-stars',
    pornstarPageCode = 'porn-star',
    favoritePageCode = 'favorite',
    favoritePornstarsPageCode = 'favorite-porn-stars'

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
            ? [{url: `/your-${pageCode}.html`}, getFavoritePornstarsMap]
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
