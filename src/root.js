import React from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router/immutable'
import history from './history'
import store from './store'
import RouterBuilder from './router-builder'
import App from './App'

const
    Root = () => <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>{RouterBuilder}</App>
        </ConnectedRouter>
    </Provider>

export default Root
