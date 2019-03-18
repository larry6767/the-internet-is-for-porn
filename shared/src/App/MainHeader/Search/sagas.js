import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

// local libs
import {BACKEND_URL} from 'src/config'
import {plainProvedGet as g, immutableProvedGet as ig} from 'src/App/helpers'
import errorActions from 'src/generic/ErrorMessage/actions'
import actions from 'src/App/MainHeader/Search/actions'

export function* loadSuggestionsFlow({payload: formData}) {
    try {
        const
            reqData = yield select(x => ({
                localeCode: ig(x, 'app', 'locale', 'localeCode'),
                orientationCode: ig(x, 'app', 'mainHeader', 'niche', 'currentOrientation'),
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

export function* runSearchFlow({payload: {path}}) {
    yield put(push(path))
}

export default function* saga() {
    yield takeEvery(g(actions, 'suggestionsFetchRequest'), loadSuggestionsFlow)
    yield takeEvery(g(actions, 'runSearch'), runSearchFlow)
}
