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
        new Date(),
        'Some unexpected exception is thrown:', err,
        'Request method:', req.method,
        'Request URL:', req.url,
        'Request body:', req.body,
        'Request headers:', req.headers
    )

export const logRequestErrorAndFail = (req, res) => err => {
    logRequestError(req)(err)
    return res.status(500).end('Internal server error')
}
