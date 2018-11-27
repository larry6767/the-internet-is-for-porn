const allowedMethods = ['get']

// boilerplate to create handlers for route mapping
export default (method, handler) => {
    if (allowedMethods.indexOf(method) === -1)
        throw new Error(`Unexpected method: "${method.toUpperCase()}"`)

    return {method, handler}
}
