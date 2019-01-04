import {cloneDeep} from 'lodash'

import {backendHost} from '../config'

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

import {logRequestError} from './helpers'
import {
    getPageData as requestPageData,
    sendReport as sendReportRequest
} from './requests'

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
                pageCode
            }

        if (withSubPageCode === 'withSubPageCode')
        params.subPageCode = req.body.subPageCode

        requestPageData(params)
        .then(x => res.json(x).end())
        .catch(jsonThrow500(req, res))
    },

    getPageData = (({validTopLevelKeys}) => (req, res) => {
        const
            invalidKeys = Object.keys(req.body).filter(x => !~validTopLevelKeys.indexOf(x))

        if (invalidKeys.length !== 0)
            jsonThrow400(req, res)('Found unexpected/unknown top-level keys in request body', {
                request: {
                    method: req.method,
                    operation: req.params.operation,
                    invalidTopLevelKeys: invalidKeys,
                },
            })

        else if (req.body.pageCode === homePageCode)
            requestHandler(req, res, homePageCode)

        else if (req.body.pageCode === allNichesPageCode)
            requestHandler(req, res, allNichesPageCode)

        else if (req.body.pageCode === nichePageCode)
            requestHandler(req, res, nichePageCode, 'withSubPageCode')

        else if (req.body.pageCode === allMoviesPageCode)
            requestHandler(req, res, allMoviesPageCode, 'withSubPageCode')

        else if (req.body.pageCode === pornstarsPageCode)
            requestHandler(req, res, pornstarsPageCode)

        else if (req.body.pageCode === pornstarPageCode)
            requestHandler(req, res, pornstarPageCode, 'withSubPageCode')

        else if (req.body.pageCode === favoritePageCode)
            requestHandler(req, res, favoritePageCode)

        else if (req.body.pageCode === favoritePornstarsPageCode)
            requestHandler(req, res, favoritePornstarsPageCode)

        else if (req.body.pageCode === videoPageCode)
            requestHandler(req, res, videoPageCode, 'withSubPageCode')

        else
            jsonThrow400(req, res)('Unexpected/unknown "pageCode" value in request body', {
                request: {
                    method: req.method,
                    operation: req.params.operation,
                    pageCode: req.body.pageCode,
                },
            })
    })({
        validTopLevelKeys: ['pageCode', 'subPageCode'],
    }),

    sendReport = (({validTopLevelKeys}) => (req, res) => {
        const
            invalidKeys = Object.keys(req.body).filter(x => !~validTopLevelKeys.indexOf(x))

        if (invalidKeys.length !== 0)
            jsonThrow400(req, res)('Found unexpected/unknown top-level keys in request body', {
                request: {
                    method: req.method,
                    operation: req.params.operation,
                    invalidTopLevelKeys: invalidKeys,
                },
            })

        else
            sendReportRequest({
                headers: proxiedHeaders(req),
                body: req.body,
            })
            .then(x => res.json(x).end())
            .catch(jsonThrow500(req, res))
    })({
        validTopLevelKeys: ['op', '_cid', '_gid', '_url', 'report-reason', 'report-comment'],
    })

export default (req, res) => {
    if (
        req.headers['accept'] !== 'application/json' ||
        req.headers['content-type'] !== 'application/json; charset=utf-8'
    )
        jsonThrow400(req, res)(
            'Only JSON API is supported, check "Accept" and "Content-Type" headers',
            {
                request: {
                    method: req.method,
                    operation: req.params.operation,
                    headers: {
                        'Accept': req.headers['accept'],
                        'Content-Type': req.headers['content-type'],
                    },
                },
            }
        )
    else if (req.method === 'POST' && req.params.operation === 'get-page-data')
        getPageData(req, res)
    else if (req.method === 'POST' && req.params.operation === 'send-report')
        sendReport(req, res)
    else
        jsonThrow400(req, res)('Unexpected request, check method and operation', {
            request: {
                method: req.method,
                operation: req.params.operation,
            },
        })
}
