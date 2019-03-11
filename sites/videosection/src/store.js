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

    enhancer =
        process.env.NODE_ENV === 'production'
            ? applyMiddleware( // not using store logger in production mode
                routerMiddleware(history),
                sagaMiddleware
            )
            : applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware,
                logger
            ),

    reducersPatch = reducers => set(reducers, 'router', connectRouter(history)),
    storePreset = window.storePreset ? window.storePreset : {},
    store = createStore(createRootReducer(reducersPatch), fromJS(storePreset), enhancer)

store.runSaga = sagaMiddleware.run

if (process.env.NODE_ENV !== 'production') window.store = store

export default store
