import {createStore, applyMiddleware} from 'redux'
import createRootReducer from './reducers.js'
import {fromJS} from 'immutable'
import logger from './middlewares/logger'
import createSagaMiddleware from 'redux-saga'
import {routerMiddleware} from 'connected-react-router/immutable'
import history from './history'

const
    sagaMiddleware = createSagaMiddleware(),
    enhancer = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        logger
    ),
    store = createStore(createRootReducer(history), fromJS({}), enhancer)

store.runSaga = sagaMiddleware.run

export default store
