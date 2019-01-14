import {pick, map, find, mapValues, omit} from 'lodash'
import fetch from 'node-fetch'
import FormData from 'form-data'
import {Agent} from 'https' // TODO FIXME for hacky-wacky stuff (blind trust to SSL cert)

import {
    plainProvedGet as g,
    PropTypes,
    assertPropTypes,
} from '../App/helpers'

import {defaultHostToFetchSiteLocalesFrom} from '../config'
import apiLocales from '../locale-mapping/backend-api'
import {backendUrl, backendUrlForReport} from './helpers/backendUrl'
import {videoItemModel} from '../generic/VideoItem/models'
import {incomingPageTextModel, pageTextModel} from './helpers/requests/getPageText'
import {incomingVideoItemModel} from './helpers/requests/getFilteredVideoList'

import {
    incomingGalleryModel,
    publishedTemplateModel,
    galleryModel,
} from './helpers/requests/getGallery'

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
            sortList = getSortList(x.page.ACTIVE_NAV_TABS, x.page.LANG_ID),
            tagArchiveListOlder = pick(x.page.TAG_ARCHIVE_OLDER, ['month', 'year']),
            tagArchiveListNewer = pick(x.page.TAG_ARCHIVE_NEWER, ['month', 'year'])

        return {
            currentPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pageText: getPageText(x.page.PAGE_TEXT),
            pagesCount: x.page.PAGES_COUNT,
            tagList: getTagListByLetters(x.page.TAGS_BY_LETTERS.letters),
            tagArchiveList: getTagArchiveList(x.page.TAG_ARCHIVE_LIST_FULL, x.page.MONTHS_NAMES),

            tagArchiveListOlder:
                Object.keys(tagArchiveListOlder).length ? tagArchiveListOlder : null,

            tagArchiveListNewer:
                Object.keys(tagArchiveListNewer).length ? tagArchiveListNewer : null,

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

    videoPageModel = PropTypes.shape({
        page: PropTypes.shape({
            GALLERY: incomingGalleryModel,
            PAGE_URL: PropTypes.string,
            TIME_AGO: publishedTemplateModel,
            PAGE_TEXT: incomingPageTextModel,
            GALS_INFO: PropTypes.shape({
                ids: PropTypes.arrayOf(PropTypes.number),
                items: PropTypes.objectOf(incomingVideoItemModel),
            }),
        }),
    }),

    mappedVideoPageModel = PropTypes.shape({
        gallery: galleryModel,
        pageText: pageTextModel,
        videoList: PropTypes.arrayOf(videoItemModel),
    }),

    getVideoPageMap = x => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(videoPageModel, x, 'getVideoPageMap', 'video page source from backend')

        const
            result = {
                gallery: getGallery(
                    g(x, 'page', 'GALLERY'),
                    g(x, 'page', 'PAGE_URL'),
                    g(x, 'page', 'TIME_AGO')
                ),

                pageText: getPageText(g(x, 'page', 'PAGE_TEXT')),

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

    // `callStackGetter` supposed to be (() => new Error().stack) in place where it's called,
    // otherwise it's hard to debug which request is caused an exception.
    fetchResponseExtractor = callStackGetter => response => {
        if ( ! response.ok)
            throw new Error(
                `Response is not OK (status code is ${response.status}), ` +
                `call stack: ${callStackGetter()}`
            )

        return response.json()
    },

    // TODO FIXME remove this when SSL certs will be fixed
    blindTruster_REMOVE_IT_SOON_OR_YOUR_ASS_WILL_BE_PENETRATED_AGAINST_YOUR_WILL =
        process.env.NODE_ENV === 'production' ? null :
        new Agent({checkServerIdentity: (host, cert) => {
            console.warn(`

                YOU'RE PLAYING DANGEROUS GAMES!
                Host: ${host}
                Certificate: ${'\n' + JSON.stringify(
                        omit(
                            mapValues(cert, (x, k) => k === 'issuerCertificate' ? null : x),
                            ['issuerCertificate', 'raw', 'pubkey']
                        ),
                        null,
                        '  '
                    )}

            `)
        }})

/*
    Generic helper to obtain data from backend for specific "page".
*/
export const getPageData = (siteLocales, localeCode) => async ({
    headers,
    pageCode,
    subPageCode,
}) => {
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

    return mapFn(await fetch(backendUrl(siteLocales, localeCode), {
        method: 'POST',
        headers,
        body: JSON.stringify({operation: 'getPageDataByUrl', params}),

        // TODO FIXME remove this:
        agent: blindTruster_REMOVE_IT_SOON_OR_YOUR_ASS_WILL_BE_PENETRATED_AGAINST_YOUR_WILL,

    }).then(fetchResponseExtractor(() => new Error().stack)))
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
        {page: {CUSTOM_DATA: {langSites}}} = await fetch(
            backendUrl(
                [{host: defaultHostToFetchSiteLocalesFrom, code: '--PLUG--'}],
                '--PLUG--'
            ),
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    operation: 'getPageDataByUrl',
                    params: {
                        url: '',
                        options: {blocks: {langSites: 1}},
                    },
                }),

                // TODO FIXME remove this:
                agent: blindTruster_REMOVE_IT_SOON_OR_YOUR_ASS_WILL_BE_PENETRATED_AGAINST_YOUR_WILL,
            }
        ).then(fetchResponseExtractor(() => new Error().stack)),

        defaultLocaleCode =
            find(map(langSites, ({active}, code) => ({code, active})), x => x.active).code

    return {
        defaultLocaleCode,
        locales: map(langSites, ({name, host}, code) => ({title: name, host, code})),
    }
}

export const sendReport = (siteLocales, localeCode) => ({headers, formData}) => fetch(
    backendUrlForReport(siteLocales, localeCode),
    {
        method: 'POST',
        headers,
        body:
            Object.keys(formData).reduce(
                (fd, k) => (fd.append(k, g(formData, k)), fd),
                new FormData()
            ),

        // TODO FIXME remove this:
        agent: blindTruster_REMOVE_IT_SOON_OR_YOUR_ASS_WILL_BE_PENETRATED_AGAINST_YOUR_WILL,
    }
).then(fetchResponseExtractor(() => new Error().stack))
