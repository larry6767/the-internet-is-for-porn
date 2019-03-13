import mkHandler from 'lib/helpers/mkHandler'

// boilerplate to create handlers for route mapping
export default (method, handlers) =>
    handlers.map(handler => mkHandler(method, handler))
