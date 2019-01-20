import {cloneDeep, find, includes, unset, get} from 'lodash'

import apiLocaleMapping from '../locale-mapping/backend-api'
import routerLocaleMapping from '../locale-mapping/router'
import i18n from '../locale-mapping/i18n'
import {plainProvedGet as g} from '../App/helpers'
import {orientationCodes} from '../App/models'
import {getPureDomain, patchSiteLocales} from '../App/helpers/hostLocale'
import {logRequestError, buildLocalePageCodes, getLegacyOrientationPrefixes} from './helpers'

import {
    getPageData as requestPageData,
    sendReport as sendReportRequest,
    getSearchSuggestions as searchSuggestionsRequest
} from './requests'

export const proxiedHeaders = (siteLocales, localeCode) => req => {
    const headers = cloneDeep(req.headers)

    delete headers['x-forwarded-proto']
    delete headers['x-forwarded-host']
    delete headers['x-forwarded-port']
    delete headers['content-length']
    delete headers['connection']
    delete headers['origin']

    headers['x-forwarded-for'] = headers['x-forwarded-for'] || req.connection.remoteAddress
    headers['host'] = g(find(siteLocales, x => g(x, 'code') === localeCode), 'host')

    headers['accept'] = 'application/json'
    headers['content-type'] = 'application/json; charset=utf-8'

    return headers
}

const
    jsonThrow500 = (req, res) => err => {
        logRequestError(req)(err)

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            exception: {
                message: err.message,
            },
        }).end()
    },

    jsonThrow400 = (req, res) => (message, additionalData) => {
        console.debug(
            '[%s] Bad request.\n', new Date(),
            '  Error message:', message, '\n',
            '  Additional data:', additionalData, '\n',
            '  Request method:', req.method, '\n',
            '  Request URL:', req.url, '\n',
            '  Request body:', req.body, '\n',
            '  Request headers:', req.headers
        )

        res.status(400).json({
            status: 'error',
            message: message,
            ...additionalData
        }).end()
    },

    requestHandler = siteLocales => (req, res, pageCode, orientationCode, withSubPageCode) => {
        const
            localeCode = g(req, 'body', 'localeCode'),

            params = {
                headers: proxiedHeaders(siteLocales, localeCode)(req),
                pageCode,
                orientationCode,
            }

        if (withSubPageCode)
            params.subPageCode = req.body.subPageCode // `subPageCode` may be not set (optional)

        requestPageData(siteLocales, localeCode)(params)
        .then(x => res.json(x).end())
        .catch(jsonThrow500(req, res))
    },

    getPageData = siteLocales => (({validTopLevelKeys}) => (req, res) => {
        const
            invalidKeys = Object.keys(req.body).filter(x => !includes(validTopLevelKeys, x))

        if (invalidKeys.length !== 0)
            return jsonThrow400(req, res)(
                'Found unexpected/unknown top-level keys in request body',
                {
                    request: {
                        method: g(req, 'method'),
                        operation: g(req, 'params', 'operation'),
                        invalidTopLevelKeys: invalidKeys,
                    },
                }
            )

        if ( ! req.body.localeCode || ! req.body.pageCode || ! req.body.orientationCode)
            return jsonThrow400(req, res)(
                'Some required field(s) is not provided in request body',
                {
                    request: {
                        method: g(req, 'method'),
                        operation: g(req, 'params', 'operation'),
                        required: {
                            localeCode: req.body.localeCode,
                            pageCode: req.body.pageCode,
                            orientationCode: req.body.orientationCode,
                        },
                    },
                }
            )

        if ( ! apiLocaleMapping.hasOwnProperty(g(req, 'body', 'localeCode')))
            return jsonThrow400(req, res)('Unknown site locale code', {
                request: {
                    method: g(req, 'method'),
                    operation: g(req, 'params', 'operation'),
                    localeCode: g(req, 'body', 'localeCode'),
                },
            })

        const
            currentApiLocale = g(apiLocaleMapping, g(req, 'body', 'localeCode')),
            orientationCode = g(req, 'body', 'orientationCode'),

            matchedPageCode = find(
                g(currentApiLocale, 'pageCode'),
                x => g(x, 'code') === g(req, 'body', 'pageCode')
            )

        if (matchedPageCode) {
            const
                code = g(matchedPageCode, 'code'),

                withSubPageCode = includes(
                    ['niche', 'allMovies', 'pornstar', 'video', 'findVideos']
                        .map(x => g(currentApiLocale, 'pageCode', x, 'code')),
                    code
                )

            requestHandler(siteLocales)(req, res, code, orientationCode, withSubPageCode)
        } else
            jsonThrow400(req, res)('Unexpected/unknown "pageCode" value in request body', {
                request: {
                    method: g(req, 'method'),
                    operation: g(req, 'params', 'operation'),
                    pageCode: g(req, 'body', 'pageCode'),
                    orientationCode: g(req, 'body', 'orientationCode'),
                },
            })
    })({
        validTopLevelKeys: ['localeCode', 'orientationCode', 'pageCode', 'subPageCode'],
    }),

    getSiteLocale = (siteLocales, defaultSiteLocaleCode) => (req, res) => {
        const
            // see also ssr/lib/render
            domain = getPureDomain(req.get('host')),

            localeCode =
                req.body.localeCode ||
                get(find(siteLocales, x => g(x, 'host') === domain), 'code', defaultSiteLocaleCode)

        res.json({
            localeCode,
            pageCodes: buildLocalePageCodes(localeCode),
            router: g(routerLocaleMapping, localeCode),
            i18n: g(i18n, localeCode),
            legacyOrientationPrefixes: getLegacyOrientationPrefixes(localeCode),
        }).end()
    },

    getSiteLocales = (siteLocales, defaultSiteLocaleCode) => (req, res) => {
        res.json(patchSiteLocales(siteLocales, defaultSiteLocaleCode)(req)).end()
    },

    getSearchSuggestions = siteLocales => (({validTopLevelKeys}) => (req, res) => {
        const
            invalidKeys = Object.keys(req.body).filter(x => !includes(validTopLevelKeys, x))

        if (invalidKeys.length !== 0)
            return jsonThrow400(req, res)(
                'Found unexpected/unknown top-level keys in request body',
                {
                    request: {
                        method: g(req, 'method'),
                        operation: g(req, 'params', 'operation'),
                        invalidTopLevelKeys: invalidKeys,
                    },
                }
            )

        if ( ! req.body.localeCode || ! req.body.orientationCode)
            return jsonThrow400(req, res)(
                'Some required field(s) is not provided in request body',
                {
                    request: {
                        method: g(req, 'method'),
                        operation: g(req, 'params', 'operation'),
                        required: {
                            localeCode: req.body.localeCode,
                            orientationCode: req.body.orientationCode,
                        },
                    },
                }
            )

        const localeCode = g(req, 'body', 'localeCode')
        unset(g(req, 'body'), 'localeCode')
        unset(g(req, 'body'), 'orientationCode')
        const formData = g(req, 'body')

        searchSuggestionsRequest(siteLocales, localeCode)({
            headers: proxiedHeaders(siteLocales, localeCode)(req),
            formData,
        })
        .then(x => res.json(x).end())
        .catch(jsonThrow500(req, res))
    })({
        validTopLevelKeys: [
            'localeCode', 'orientationCode', 'classId', 'searchKey',
        ],
    }),

    sendReport = siteLocales => (({validTopLevelKeys}) => (req, res) => {
        const
            invalidKeys = Object.keys(req.body).filter(x => !includes(validTopLevelKeys, x))

        if (invalidKeys.length !== 0)
            return jsonThrow400(req, res)(
                'Found unexpected/unknown top-level keys in request body',
                {
                    request: {
                        method: g(req, 'method'),
                        operation: g(req, 'params', 'operation'),
                        invalidTopLevelKeys: invalidKeys,
                    },
                }
            )

        if ( ! req.body.localeCode || ! req.body.orientationCode)
            return jsonThrow400(req, res)(
                'Some required field(s) is not provided in request body',
                {
                    request: {
                        method: g(req, 'method'),
                        operation: g(req, 'params', 'operation'),
                        required: {
                            localeCode: req.body.localeCode,
                            orientationCode: req.body.orientationCode,
                        },
                    },
                }
            )

        const localeCode = g(req, 'body', 'localeCode')
        unset(g(req, 'body'), 'localeCode')
        unset(g(req, 'body'), 'orientationCode')
        const formData = g(req, 'body')

        sendReportRequest(siteLocales, localeCode)({
            headers: proxiedHeaders(siteLocales, localeCode)(req),
            formData,
        })
        .then(x => res.json(x).end())
        .catch(jsonThrow500(req, res))
    })({
        validTopLevelKeys: [
            'localeCode', 'orientationCode',
            'op', '_cid', '_gid', '_url', 'report-reason', 'report-comment',
        ],
    })

export default (siteLocales, defaultSiteLocaleCode) => (req, res) => {
    if (
        req.headers['accept'] !== 'application/json' ||
        req.headers['content-type'] !== 'application/json; charset=utf-8'
    )
        jsonThrow400(req, res)(
            'Only JSON API is supported, check "Accept" and "Content-Type" headers',
            {
                request: {
                    method: g(req, 'method'),
                    operation: req.params.operation,
                    localeCode: req.body.localeCode,
                    orientationCode: req.body.orientationCode,
                    headers: {
                        'Accept': req.headers['accept'],
                        'Content-Type': req.headers['content-type'],
                    },
                },
            }
        )
    else if (
        req.body.localeCode &&
        !find(siteLocales, x => g(x, 'code') === g(req, 'body', 'localeCode'))
    )
        jsonThrow400(req, res)(
            'Provided locale code (`localeCode`) is unknown',
            {
                request: {
                    method: g(req, 'method'),
                    operation: req.params.operation,
                    localeCode: g(req, 'body', 'localeCode'),
                    orientationCode: req.body.orientationCode,
                    headers: {
                        'Accept': req.headers['accept'],
                        'Content-Type': req.headers['content-type'],
                    },
                },
            }
        )
    else if (
        req.body.orientationCode &&
        !includes(orientationCodes, g(req, 'body', 'orientationCode'))
    )
        jsonThrow400(req, res)('Provided orientation code (`orientationCode`) is unknown', {
            request: {
                method: g(req, 'method'),
                operation: req.params.operation,
                localeCode: req.body.localeCode,
                orientationCode: g(req, 'body', 'orientationCode'),
            },
        })
    else if (g(req, 'method') === 'GET' && req.params.operation === 'get-site-locales')
        getSiteLocales(siteLocales, defaultSiteLocaleCode)(req, res)
    else if (g(req, 'method') === 'POST' && req.params.operation === 'get-site-locale-data')
        getSiteLocale(siteLocales, defaultSiteLocaleCode)(req, res)
    else if (g(req, 'method') === 'POST' && req.params.operation === 'get-page-data')
        getPageData(siteLocales)(req, res)
    else if (g(req, 'method') === 'POST' && req.params.operation === 'get-search-suggestions')
        getSearchSuggestions(siteLocales)(req, res)
    else if (g(req, 'method') === 'POST' && req.params.operation === 'send-report')
        sendReport(siteLocales)(req, res)
    else
        jsonThrow400(req, res)('Unexpected request, check method and operation', {
            request: {
                method: g(req, 'method'),
                operation: req.params.operation,
                localeCode: req.body.localeCode,
                orientationCode: req.body.orientationCode,
            },
        })
}
