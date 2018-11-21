import {cloneDeep} from 'lodash'

import {backendHost} from '../config'
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
    throw500 = (req, res) => err => {
        console.error(
            new Date(),
            'Some unexpected exception is thrown:', err,
            'Request method:', req.method,
            'Request URL:', req.url,
            'Request body:', req.body,
            'Request headers:', req.headers
        )

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            exception: {
                message: err.message,
            },
        }).end()
    },

    throw400 = (req, res) => (message, additionalData) => {
        console.debug(
            new Date(),
            'Bad request.',
            'Error message:', message,
            'Additional data:', additionalData,
            'Request method:', req.method,
            'Request URL:', req.url,
            'Request body:', req.body,
            'Request headers:', req.headers
        )

        res.status(400).json({
            status: 'error',
            message: message,
            ...additionalData
        }).end()
    },

    getPageData = (({validTopLevelKeys}) => (req, res) => {
        const
            invalidKeys = Object.keys(req.body).filter(x => !~validTopLevelKeys.indexOf(x))

        if (invalidKeys.length !== 0)
            throw400(req, res)('Found unexpected/unknown top-level keys in request body', {
                request: {
                    method: req.method,
                    operation: req.params.operation,
                    invalidTopLevelKeys: invalidKeys,
                },
            })
        else if (req.body.pageCode === 'all-niches')
            requests.getPageData({
                headers: proxiedHeaders(req),
                pageCode: req.body.pageCode,
            })
            .then(x => res.json(x).end())
            .catch(throw500(req, res))
        else if (req.body.pageCode === 'niche')
            requests.getPageData({
                headers: proxiedHeaders(req),
                pageCode: req.body.pageCode,
                pageSubCode: req.body.pageSubCode,
            })
            .then(x => res.json(x).end())
            .catch(throw500(req, res))
        else
            throw400(req, res)('Unexpected/unknown "pageCode" value in request body', {
                request: {
                    method: req.method,
                    operation: req.params.operation,
                    pageCode: req.body.pageCode,
                },
            })
    })({
        validTopLevelKeys: ['pageCode', 'pageSubCode'],
    })

export default (req, res) => {
    if (
        req.headers['accept'] !== 'application/json' ||
        req.headers['content-type'] !== 'application/json; charset=utf-8'
    )
        throw400(req, res)(
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
        throw400(req, res)('Unexpected request, check method and operation', {
            request: {
                method: req.method,
                operation: req.params.operation,
            },
        })
}
