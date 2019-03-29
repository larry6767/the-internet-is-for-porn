import {map, find, compact} from 'lodash'
import fetch from 'node-fetch'
import FormData from 'form-data'
import queryString from 'query-string'

// local libs
import {plainProvedGet as g, assertPropTypes, getClassId} from 'src/App/helpers'
import {defaultHostToFetchSiteLocalesFrom} from 'ssr/config'
import {backendUrl, backendUrlForReport, backendUrlForSearch} from 'ssr/lib/helpers/backendUrl'
import {getPageDataPageMapping} from 'ssr/lib/requests/getPageDataPageMapping'
import {getPageDataUrlBuilder} from 'ssr/lib/requests/getPageDataUrlBuilder'
import {fetchResponseExtractor} from 'ssr/lib/requests/fetchResponseExtractor'
import {getPreparedParams} from 'ssr/lib/requests/getPreparedParams'

import {getPageDataResultModel, getPageDataReqBodyModel} from 'ssr/lib/models'

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
}) => {
    const
        preparedParams = getPreparedParams(
            localeCode,
            orientationCode,
            page,

            child,
            subchild,
            ordering,
            pagination,
            archive ? [g(archive, 'year'), g(archive, 'month')] : [],
            searchQuery,
        ),

        url = getPageDataUrlBuilder(preparedParams),

        result = g(getPageDataPageMapping, page)

        console.log('+++++++++++++URL: ', url)

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
