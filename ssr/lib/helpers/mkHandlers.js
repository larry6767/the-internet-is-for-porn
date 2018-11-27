import {mkHandler} from '.'
// boilerplate to create handlers for route mapping
export default (method, handlers) =>
    handlers.map(handler => mkHandler(method, handler))
