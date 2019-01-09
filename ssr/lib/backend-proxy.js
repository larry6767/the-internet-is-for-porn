import {cloneDeep, find, includes} from 'lodash'

import {backendHost} from '../config'
import apiLocaleMapping from '../api-locale-mapping'
import {logRequestError, buildLocalePageCodes} from './helpers'
import {getPageData as requestPageData} from './requests'
import {plainProvedGet as g} from '../App/helpers'

export const proxiedHeaders = (req) => {
    const
        headers = cloneDeep(req.headers)

    delete headers['x-forwarded-proto']
    delete headers['x-forwarded-host']
    delete headers['x-forwarded-port']
    delete headers['content-length']
    delete headers['connection']
    delete headers['origin']

    headers['x-forwarded-for'] = headers['x-forwarded-for'] || req.connection.remoteAddress
    headers['host'] = backendHost

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

    requestHandler = (req, res, pageCode, withSubPageCode) => {
        const
            params = {
                headers: proxiedHeaders(req),
                pageCode,
            }

        if (withSubPageCode)
            params.subPageCode = req.body.subPageCode // `subPageCode` may be not set (optional)

        requestPageData(g(req, 'body', 'localeCode'))(params)
        .then(x => res.json(x).end())
        .catch(jsonThrow500(req, res))
    },

    getPageData = (({validTopLevelKeys}) => (req, res) => {
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

        if ( ! req.body.localeCode || ! req.body.pageCode)
            return jsonThrow400(req, res)(
                'Some required field(s) is not provided in request body',
                {
                    request: {
                        method: g(req, 'method'),
                        operation: g(req, 'params', 'operation'),
                        required: {
                            localeCode: req.body.localeCode,
                            pageCode: req.body.pageCode,
                        },
                    },
                }
            )

        if ( ! apiLocaleMapping.hasOwnProperty(g(req, 'body', 'localeCode')))
            return jsonThrow400(req, res)('Unknown site locale code', {
                request: {
                    method: g(req, 'method'),
                    localeCode: g(req, 'body', 'localeCode'),
                    operation: g(req, 'params', 'operation'),
                },
            })

        const
            currentApiLocale = g(apiLocaleMapping, g(req, 'body', 'localeCode')),

            matchedPageCode = find(
                g(currentApiLocale, 'pageCode'),
                x => g(x, 'code') === g(req, 'body', 'pageCode')
            )

        if (matchedPageCode) {
            const
                code = g(matchedPageCode, 'code'),

                withSubPageCode = includes(
                    ['niche', 'allMovies', 'pornstar']
                        .map(x => g(currentApiLocale, 'pageCode', x, 'code')),
                    code
                )

            requestHandler(req, res, code, withSubPageCode)
        } else
            jsonThrow400(req, res)('Unexpected/unknown "pageCode" value in request body', {
                request: {
                    method: g(req, 'method'),
                    operation: g(req, 'params', 'operation'),
                    pageCode: g(req, 'body', 'pageCode'),
                },
            })
    })({
        validTopLevelKeys: ['localeCode', 'pageCode', 'subPageCode'],
    }),

    getSiteLocale = (siteLocales, defaultSiteLocaleCode) => (req, res) => {
        const
            localeCode = req.body.localeCode || defaultSiteLocaleCode

        res.json({
            localeCode,
            pageCodes: buildLocalePageCodes(localeCode),
        }).end()
    }

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
                    headers: {
                        'Accept': req.headers['accept'],
                        'Content-Type': req.headers['content-type'],
                    },
                },
            }
        )
    else if (g(req, 'method') === 'POST' && req.params.operation === 'get-site-locale')
        getSiteLocale(siteLocales, defaultSiteLocaleCode)(req, res)
    else if (g(req, 'method') === 'POST' && req.params.operation === 'get-page-data')
        getPageData(req, res)
    else
        jsonThrow400(req, res)('Unexpected request, check method and operation', {
            request: {
                method: g(req, 'method'),
                operation: req.params.operation,
            },
        })
}
