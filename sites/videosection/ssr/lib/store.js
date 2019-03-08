import url from 'url'
import {set} from 'lodash'
import {fromJS} from 'immutable'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from '../reducers'


export const initialStore = fromJS({
    router: {
        location: {
            hash: '',
            pathname: '/',
            search: '',
        },
    },
    app: {
        ssr: {
            isSSR: true,
        },
        mainHeader: {
            language: {
                siteLocales: {
                    list: [],
                    isLoaded: false,
                },
            },
        },
    },
})


export const initialStoreOnUrl = reqUrl =>
    initialStore.updateIn(['router', 'location'], x => {
        const {pathname, search, hash} = url.parse(reqUrl)
        return x.merge({pathname: pathname || '', search: search || '', hash: hash || ''})
    })


const reducersPatch = reducers => set(reducers, 'router', x => x)

export const newStore = (siteLocales, reqUrl) => {
    const
        sagaMiddleware = createSagaMiddleware(),
        enhancer = applyMiddleware(sagaMiddleware),

        store = createStore(
            createRootReducer(reducersPatch),

            initialStoreOnUrl(reqUrl)
                .mergeIn(['app', 'mainHeader', 'language', 'siteLocales'], fromJS({
                    list: siteLocales,
                    isLoaded: true,
                })),

            enhancer
        )

    store.runSaga = sagaMiddleware.run
    return store
}
