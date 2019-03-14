import React from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router/immutable'

// local libs
import history from 'src/history'
import store from 'src/store'
import RouterBuilder from 'src/App/RouterBuilder'
import App from 'src/App'

const
    Root = () => <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>{RouterBuilder}</App>
        </ConnectedRouter>
    </Provider>

export default Root
