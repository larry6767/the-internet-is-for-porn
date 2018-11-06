import {createStore, applyMiddleware} from 'redux'
import createRootReducer from './reducers.js'
import {fromJS} from 'immutable'
import logger from './middlewares/logger'

import {routerMiddleware} from 'connected-react-router/immutable'
import history from './history'

const
    enhancer = applyMiddleware(routerMiddleware(history), logger),
    store = createStore(createRootReducer(history), fromJS({}), enhancer)

// dev only
window.store = store

export default store
