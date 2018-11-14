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
