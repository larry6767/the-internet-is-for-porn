import {cloneDeep} from 'lodash'

import {backendHost} from '../config'
import {logRequestError} from './helpers'
import * as requests from './requests'

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

    requestHandler = (req, res, pageCode, subPageCode) => {
        const
            params = {
                headers: proxiedHeaders(req),
                pageCode
            }

        if (subPageCode)
        params.subPageCode = req.body.subPageCode

        requests.getPageData(params)
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

        else if (req.body.pageCode === 'all-niches')
            requestHandler(req, res, requests.allNichesPageCode)

        else if (req.body.pageCode === 'niche')
            requestHandler(req, res, requests.nichePageCode, true)

        else if (req.body.pageCode === 'all-movies')
            requestHandler(req, res, requests.allMoviesPageCode, true)

        else if (req.body.pageCode === 'porn-stars')
            requestHandler(req, res, requests.pornstarsPageCode)

        else if (req.body.pageCode === 'pornstar')
            requestHandler(req, res, requests.pornstarPageCode, true)

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
    else
        jsonThrow400(req, res)('Unexpected request, check method and operation', {
            request: {
                method: req.method,
                operation: req.params.operation,
            },
        })
}
