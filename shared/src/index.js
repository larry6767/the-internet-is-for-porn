import React from 'react'
import {render} from 'react-dom'

// local libs
import Root from 'src/root'
import store from 'src/store'
import saga from 'src/sagas'
import {plainProvedGet as g, immutableProvedGet as ig} from 'src/App/helpers'
import appActions from 'src/App/actions'
import {BACKEND_URL} from 'src/config'

store.runSaga(saga)

const
    rootEl = g(document.getElementById('root'), []),
    htmlEl = g(document.getElementsByTagName('html'), 0),

    runFrontEnd = async () => {
        try {
            render(<Root />, rootEl)
        } catch (err) {
            console.error('Application initialization is failed with exception:', err)
            window.alert('Application initialization is failed!')
        } finally {
            htmlEl.classList.remove('is-loading')
        }
    }

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
                localeCode: window.localStorage.getItem('development-locale-code'),
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
            return runFrontEnd()
        }).catch(err => {
            console.error('Application initialization is failed with exception:', err)
            render(<div>
                <h1>Error!</h1>
                <p>Application initialization is failed!</p>
            </div>, rootEl)
        })
}
