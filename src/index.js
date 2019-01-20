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
    rootEl = document.getElementById('root'),
    runFrontEnd = () => render(<Root />, rootEl)

if (process.env.NODE_ENV === 'production')
    runFrontEnd()
else {
    // For development react server only,
    // with production mode it supposed to be filled by `window.storePreset`.
    if (ig(store.getState(), 'app', 'locale', 'localeCode'))
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
            if ( ! response.ok)
                throw new Error(`Response is not OK (status code is ${response.status})`)

            return response.json()
        }).then(x => {
            // WARNING! see also `ssr/lib/render` to keep this up to date
            store.dispatch(appActions.setLocaleCode(g(x, 'localeCode')))
            store.dispatch(appActions.fillLocaleRouter(g(x, 'router')))
            store.dispatch(appActions.fillLocaleI18n(g(x, 'i18n')))
            store.dispatch(
                appActions.fillLocaleLegacyOrientationPrefixes(g(x, 'legacyOrientationPrefixes'))
            )
            runFrontEnd()
        }).catch(err => {
            console.error('Application initialization is failed with exception:', err)
            render(<div>
                <h1>Error!</h1>
                <p>Application initialization is failed!</p>
            </div>, rootEl)
        })
}
