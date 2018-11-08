import React from 'react'
import {Provider} from 'react-redux'
import App from './App'
import store from './store'
import saga from './sagas'

const
    Root = () => <Provider store={store}>
        <App/>
    </Provider>

store.runSaga(saga)

export default Root
