const allowedMethods = ['get']

// boilerplate to create handlers for route mapping
export const mkHandler = (method, handler) => {
    if (allowedMethods.indexOf(method) === -1)
        throw new Error(`Unexpected method: "${method.toUpperCase()}"`)

    return {method, handler}
}

// boilerplate to create handlers for route mapping
export const mkHandlers = (method, handlers) =>
    handlers.map(handler => mkHandler(method, handler))

export const logRequestError = req => err =>
    console.error(
        '[%s] Some unexpected exception is thrown:', new Date(), err, '\n',
        '  Request method:', req.method, '\n',
        '  Request URL:', req.url, '\n',
        '  Request body:', req.body, '\n',
        '  Request headers:', req.headers
    )

export const logRequestErrorAndFail = (req, res) => err => {
    logRequestError(req)(err)
    return res.status(500).end('Internal server error')
}
