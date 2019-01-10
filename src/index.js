import React from 'react'
import {render} from 'react-dom'
import Root from './root'
import store from './store'
import saga from './sagas'
import {plainProvedGet as g, immutableProvedGet as ig, getCookie} from './App/helpers'
import appActions from './App/actions'
import {BACKEND_URL} from './config'

store.runSaga(saga)

const
    runFrontEnd = () => render(<Root />, document.getElementById('root'))

// TODO also handle "test.*" domain to store locale in a cookie
if (process.env.NODE_ENV === 'production')
    runFrontEnd()
else {
    // For development react server only,
    // on production it supposed to be filled by `window.storePreset`.
    if (ig(store.getState(), 'app', 'locale', 'pageCode'))
        runFrontEnd()
    else
        fetch(`${BACKEND_URL}/get-site-locale-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                localeCode: getCookie('development-locale-code') || null,
            }),
        }).then(response => {
            if (response.status !== 200)
                throw new Error(`Response status is ${response.status} (not 200)`)

            return response.json()
        }).then(x => {
            store.dispatch(appActions.setLocaleCode(g(x, 'localeCode')))
            store.dispatch(appActions.fillLocalePageCodes(g(x, 'pageCodes')))
            runFrontEnd()
        }).catch(err => {
            console.error('Application initialization is failed with exception:', err)
        })
}
