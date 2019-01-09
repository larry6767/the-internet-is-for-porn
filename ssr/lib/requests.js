import {pick, map, find} from 'lodash'
import rp from 'request-promise-native'

import apiLocales from '../api-locale-mapping'
import {plainProvedGet as g} from '../App/helpers'
import {backendUrl, backendUrlForReport} from './helpers/backendUrl'

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
    getGallery,
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
            gallery: getGallery(x.page.GALLERY, x.page.PAGE_URL, x.page.TIME_AGO),
            pageText: getPageText(x.page.PAGE_TEXT),
            videoList: getFilteredVideoList(x.page.GALS_INFO.ids, x.page.GALS_INFO.items),
        }
    }

/*
    Generic helper to obtain data from backend for specific "page".
*/
export const getPageData = (siteLocales, localeCode) => async ({headers, pageCode, subPageCode}) => {
    // To assign it in conditions, done it this way to reduce human-factor mistakes
    // (like you may accidentally write `locale.home.code` in condition
    // and `urlFunc(locale.niche.url)` for url
    // and with this variable you assign page code branch only once).
    let x

    const
        localeBranch = (...xs) => g(apiLocales, [localeCode, 'pageCode'].concat(xs)),

        urlFunc = url => url
            .replace(/%PAGE_CODE%/g, pageCode)
            .replace(/%SUB_PAGE_CODE%/g, subPageCode),

        [params, mapFn] =
            pageCode === (x = localeBranch('home'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url')), options: {blocks: {
                allTagsBlock: 1,
                modelsABCBlockText: 1,
                modelsABCBlockThumbs: 1,
            }}}, getHomeMap]

            : pageCode === (x = localeBranch('allNiches'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url')), options: {blocks: {allTagsBlock: 1}}}, getAllNichesMap]

            : pageCode === (x = localeBranch('niche'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url')), options: {blocks: {allTagsBlock: 1}}}, getNicheMap]

            : pageCode === (x = localeBranch('allMovies'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url')), options: {blocks: {allTagsBlock: 1}}}, getAllMoviesMap]

            : pageCode === (x = localeBranch('pornstars'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url'))}, getPornstarsMap]

            : pageCode === (x = localeBranch('pornstar'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url')), options: {blocks: {
                modelsABCBlockText: 1,
                modelsABCBlockThumbs: 1,
            }}}, getPornstarMap]

            : pageCode === (x = localeBranch('favorite'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url'))}, getFavoriteMap]

            : pageCode === (x = localeBranch('favoritePornstars'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url')), options: {blocks: {
                modelsABCBlockThumbs: 1,
            }}}, getFavoritePornstarsMap]

            : pageCode === (x = localeBranch('video'), g(x, 'code'))
            ? [{url: urlFunc(g(x, 'url'))}, getVideoPageMap]

            : null

    if (params === null)
        throw new Error(`Unexpected page code: "${pageCode}"`)

    return mapFn(await rp({
        uri: backendUrl(siteLocales, localeCode),
        method: 'POST',
        headers,
        json: true,
        body: {operation: 'getPageDataByUrl', params},
    }))
}

/*
    Requests a list of site locales which looks like this:
        [
            { title: 'English',  host: 'domain.com',    code: 'eng' },
            { title: 'Deutsch',  host: 'de.domain.com', code: 'deu' },
            { title: 'Italiano', host: 'it.domain.com', code: 'ita' },
            ...
        ]

    Actual result consists of this structure:
        {
            defaultLocaleCode: 'eng',
            locales: [
                // That list of locales mentioned above...
            ],
        }
*/
export const getSiteLocales = async () => {
    const
        {page: {CUSTOM_DATA: {langSites}}} = await rp({
            uri: backendUrl([{host: 'videosection.com', code: '--PLUG--'}], '--PLUG--'),
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json; charset=utf-8',
            },
            json: true,
            body: {
                operation: 'getPageDataByUrl',
                params: {
                    url: '',
                    options: {blocks: {langSites: 1}},
                },
            },
        }),

        defaultLocaleCode =
            find(map(langSites, ({active}, code) => ({code, active})), x => x.active).code

    return {
        defaultLocaleCode,
        locales: map(langSites, ({name, host}, code) => ({title: name, host, code})),
    }
}

export const sendReport = (siteLocales, localeCode) => ({headers, formData}) => rp({
    uri: backendUrlForReport(siteLocales, localeCode),
    method: 'POST',
    headers,
    json: true,
    formData,
})
