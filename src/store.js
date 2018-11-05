import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers.js'
import {fromJS} from 'immutable'
import logger from './middlewares/logger'

const
    enhancer = applyMiddleware(logger),
    store = createStore(reducers, fromJS({}), enhancer)

// dev only
window.store = store

export default store
