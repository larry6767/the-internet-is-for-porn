import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {BACKEND_URL} from '../../../config'
import {plainProvedGet as g, immutableProvedGet as ig} from '../../helpers'
import errorActions from '../../../generic/ErrorMessage/actions'
import actions from './actions'

export function* loadSuggestionsFlow({payload: formData}) {
    try {
        const
            reqData = yield select(x => ({
                localeCode: ig(x, 'app', 'locale', 'localeCode'),
                ...formData
            })),

            suggestions = yield fetch(`${BACKEND_URL}/get-search-suggestions`, {
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

        yield put(actions.setNewSuggestions(suggestions))
    } catch (err) {
        console.error('loadSuggestionsFlow is failed with exception:', err)
        yield put(actions.sendReportFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export function* runSearchFlow({payload: searchKey}) {
    yield put(push(`/find-videos?key=${searchKey}`))
}

export default function* saga() {
    yield takeEvery(g(actions, 'suggestionsFetchRequest'), loadSuggestionsFlow)
    yield takeEvery(g(actions, 'runSearch'), runSearchFlow)
}
