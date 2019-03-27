import {map, find, compact} from 'lodash'
import fetch from 'node-fetch'
import FormData from 'form-data'
import queryString from 'query-string'
import {parse, format} from 'url'

// local libs
import {plainProvedGet as g, assertPropTypes, getClassId} from 'src/App/helpers'
import {defaultHostToFetchSiteLocalesFrom} from 'ssr/config'
import apiLocales from 'ssr/locale-mapping/backend-api'
import routerLocales from 'ssr/locale-mapping/router'
import {backendUrl, backendUrlForReport, backendUrlForSearch} from 'ssr/lib/helpers/backendUrl'
import getSubPage, {orderingMapping} from 'ssr/lib/getSubPage'
import deepFreeze from 'ssr/lib/helpers/deepFreeze'

import {
    getHomeMap,
    getAllNichesMap,
    getNicheMap,
    getAllMoviesMap,
    getPornstarsMap,
    getPornstarMap,
    getFavoriteMap,
    getFavoritePornstarsMap,
    getVideoPageMap,
    getFindVideosMap,
    getSiteMap,
    getNotFoundMap,
} from 'ssr/lib/mapFns'

import {
    getPageDataResultModel,
    getPageDataReqBodyModel,
    getPageDataPageMappingModel,
} from 'ssr/lib/models'

const
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

    getPageDataPageMapping = Object.freeze({
        home: Object.freeze([
            deepFreeze({blocks: {allTagsBlock: 1, modelsABCBlockText: 1, modelsABCBlockThumbs: 1}}),
            getHomeMap,
        ]),
        allNiches: Object.freeze([
            deepFreeze({blocks: {extendedTagsBlock: 1}}),
            getAllNichesMap,
        ]),
        niche: Object.freeze([
            deepFreeze({blocks: {
                allTagsBlock: 1,
                searchSponsors: 1,
                updateExtraURL: 1,
                updateSponsorURL: 1,
            }}),
            getNicheMap,
        ]),
        allMovies: Object.freeze([
            deepFreeze({blocks: {
                allTagsBlock: 1,
                searchSponsors: 1,
                updateExtraURL: 1,
                updateSponsorURL: 1,
            }}),
            getAllMoviesMap,
        ]),
        pornstars: Object.freeze([
            null,
            getPornstarsMap,
        ]),
        pornstar: Object.freeze([
            deepFreeze({blocks: {
                modelsABCBlockText: 1,
                modelsABCBlockThumbs: 1,
                updateExtraURL: 1,
                updateSponsorURL: 1,
            }}),
            getPornstarMap,
        ]),
        favorite: Object.freeze([
            deepFreeze({blocks: {updateExtraURL: 1, updateSponsorURL: 1}}),
            getFavoriteMap,
        ]),
        favoritePornstars: Object.freeze([
            deepFreeze({blocks: {modelsABCBlockThumbs: 1}}),
            getFavoritePornstarsMap,
        ]),
        video: Object.freeze([
            deepFreeze({blocks: {searchSponsors: 1, updateExtraURL: 1, updateSponsorURL: 1}}),
            getVideoPageMap,
        ]),
        findVideos: Object.freeze([
            deepFreeze({blocks: {updateExtraURL: 1, updateSponsorURL: 1}}),
            getFindVideosMap,
        ]),
        site: Object.freeze([
            deepFreeze({blocks: {updateExtraURL: 1, updateSponsorURL: 1}}),
            getSiteMap,
        ]),
        notFound: Object.freeze([
            deepFreeze({blocks: {updateExtraURL: 1, updateSponsorURL: 1}}),
            getNotFoundMap,
        ]),
    }),

    getPageDataUrlBuilder = (localeCode, orientationCode, page, subPageCode) => {
        const
            pageCodeBranch = g(apiLocales, localeCode, 'pageCode', page),
            orientationPrefix = g(apiLocales, localeCode, 'orientationPrefixes', orientationCode),
            {code} = pageCodeBranch

        let
            url = g(pageCodeBranch, 'url')

        if (pageCodeBranch.hasOwnProperty('code'))
            url = url.replace(/%PAGE_CODE%/g, g(pageCodeBranch, 'code', orientationCode))

        if (subPageCode !== null)
            url = url.replace(/%SUB_PAGE_CODE%/g, subPageCode)

        url = url.replace(/%ORIENTATION_PFX%/g, orientationPrefix)
        url = parse(url)
        url.pathname = url.pathname.split(/\//).map(x => encodeURIComponent(x)).join('/')
        return format(url)
    }

if (process.env.NODE_ENV !== 'production')
    assertPropTypes(
        getPageDataPageMappingModel,
        getPageDataPageMapping,
        'requests',
        'getPageDataPageMapping'
    )

/*
    Generic helper to obtain data from backend for specific "page".
*/
export const getPageData = siteLocales => async ({
    headers,

    localeCode,
    orientationCode,
    page,

    child,
    subchild,
    ordering,
    pagination,
    archive,
    searchQuery,
    isSitePage = false,
}) => {
    const
        backOrdering = !ordering ? null : find(
            Object.keys(orderingMapping),
            k => g(routerLocales, localeCode, 'ordering', k, 'qsValue') === ordering
        )

    if (ordering && !backOrdering)
        throw new Error(`"ordering" argument is broken: ${JSON.stringify(ordering)}`)

    const
        subPageCode = getSubPage(
            child && subchild ? `${child}/${subchild}` : child,
            backOrdering,
            pagination,
            archive ? [g(archive, 'year'), g(archive, 'month')] : [],
            searchQuery,
            isSitePage,
        ),

        url = getPageDataUrlBuilder(localeCode, orientationCode, page, subPageCode),
        result = g(getPageDataPageMapping, page)

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(getPageDataResultModel, result, 'requests', 'getPageData')

    const
        [options, mapFn] = result,
        body = {operation: 'getPageDataByUrl', params: {url}}

    if (options !== null)
        body.params.options = options

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(getPageDataReqBodyModel, body, 'requests', 'getPageData')

    return mapFn(await fetch(backendUrl(siteLocales, localeCode), {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
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
            }
        ).then(fetchResponseExtractor(() => new Error().stack)),

        defaultLocaleCode =
            find(map(langSites, ({active}, code) => ({code, active})), x => x.active).code

    return {
        defaultLocaleCode,
        locales: map(langSites, ({name, host}, code) => ({title: name, host, code})),
    }
}

export const sendReport = (siteLocales, localeCode, orientationCode) => ({headers, body}) => {
    const
        classId = getClassId(orientationCode),
        preparedBody = {
            op: 'abuse_report',
            _cid: classId,
            _url: g(body, 'url'),
            'report-reason': g(body, 'reason'),
            'report-comment': g(body, 'comment'),
        }

    if (g(body, 'userUrl')) preparedBody['report-url'] = g(body, 'userUrl')
    if (g(body, 'tagId')) preparedBody['_tid'] = g(body, 'tagId')
    if (g(body, 'galleryId')) preparedBody['_gid'] = g(body, 'galleryId')

    return fetch(
        backendUrlForReport(siteLocales, localeCode),
        {
            method: 'POST',
            headers,
            body:
                Object.keys(preparedBody).reduce(
                    (fd, k) => (fd.append(k, g(preparedBody, k)), fd),
                    new FormData()
                ),
        }
    ).then(fetchResponseExtractor(() => new Error().stack))
}

export const getSearchSuggestions = (siteLocales, localeCode, orientationCode) =>
    async ({headers, formData}) => {
        const
            // 'compact' is for array with a single empty value, like ['']
            prepareData = x => compact(x),

            classId = getClassId(orientationCode),

            qs = {
                c: classId,
                t: g(formData, 'searchQuery'),
            }

        return prepareData(await fetch(
            `${backendUrlForSearch(siteLocales, localeCode)}?${queryString.stringify(qs)}`,
            {
                method: 'GET',
                headers,
            }
        ).then(fetchResponseExtractor(() => new Error().stack)))
}
