import {includes} from 'lodash'

const allowedMethods = ['get']

// boilerplate to create handlers for route mapping
export default (method, handler) => {
    if ( ! includes(allowedMethods, method))
        throw new Error(`Unexpected method: "${method.toUpperCase()}"`)

    return {method, handler}
}
