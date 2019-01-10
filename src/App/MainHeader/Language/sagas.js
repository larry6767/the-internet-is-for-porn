import {put, takeEvery, select} from 'redux-saga/effects'

import {BACKEND_URL} from '../../../config'
import {plainProvedGet as g, immutableProvedGet as ig} from '../../helpers'
import errorActions from '../../../generic/ErrorMessage/actions'
import actions from './actions'

// this one is't supposed to be called on SSR side,
// related store branch supposed to be pre-filled on SSR side.
export function* loadSiteLocalesFlow(action) {
    try {
        const
            currentLocaleCode = yield select(x => ig(x, 'app', 'locale', 'localeCode')),

            data = yield fetch(`${BACKEND_URL}/get-site-locales`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
            }).then(response => {
                if (response.status !== 200)
                    throw new Error(`Response status is ${response.status} (not 200)`)

                return response.json()
            }),

            // building verified data
            siteLocales = data.map(x => ({
                code: g(x, 'code'),
                host: g(x, 'host'),
                title: g(x, 'title'),
            }))

        yield put(actions.loadSiteLocalesSuccess({siteLocales, currentLocaleCode}))
    } catch (err) {
        console.error('loadSiteLocalesFlow is failed with an exception:', err)
        yield put(actions.loadSiteLocalesFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(g(actions, 'loadSiteLocalesRequest'), loadSiteLocalesFlow)
}

