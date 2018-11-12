import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {connectRouter, routerMiddleware} from 'connected-react-router/immutable'
import {fromJS} from 'immutable'
import {set} from 'lodash'
import logger from './middlewares/logger'
import createRootReducer from './reducers.js'
import history from './history'

const
    sagaMiddleware = createSagaMiddleware(),
    enhancer = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        logger
    ),
    reducersPatch = reducers => set(reducers, 'router', connectRouter(history)),
    store = createStore(createRootReducer(reducersPatch), fromJS({}), enhancer)

store.runSaga = sagaMiddleware.run

export default store
