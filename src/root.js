import React from 'react'
import {Provider} from 'react-redux'
import App from './App'

import store from './store'
import {ConnectedRouter} from 'connected-react-router/immutable'
import history from './history'

const
    Root = () => <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>

export default Root
