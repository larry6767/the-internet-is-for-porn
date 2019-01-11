import {get} from 'lodash'
import {put, takeEvery, select} from 'redux-saga/effects'

import {BACKEND_URL} from '../../../config'
import {plainProvedGet as g, immutableProvedGet as ig} from '../../helpers'
import errorActions from '../../../generic/ErrorMessage/actions'
import actions from './actions'

export function* loadSuggestionsFlow({payload: formData}) {
    try {
        const
            reqData = yield select(x => ({
                localeCode: ig(x, 'app', 'locale', 'localeCode'),
                // ...formData.toJS()
                ...formData
            })),

            data = yield fetch(`${BACKEND_URL}/get-search-suggestions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(reqData),
            }).then(response => {
                if (response.status !== 200)
                    throw new Error(`Response status is ${response.status} (not 200)`)

                return response.json()
            })

        if (get(data, 'length')) {
            console.log('search suggestions: ', data)
            // yield put(actions.sendReportSuccess())
        } else {
            console.log('no search suggestions: ', data)
        }
    } catch (err) {
        console.error('loadSuggestionsFlow is failed with exception:', err)
        yield put(actions.sendReportFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(g(actions, 'suggestionsFetchRequest'), loadSuggestionsFlow)
}
