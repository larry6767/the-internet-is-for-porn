import {put, takeEvery} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {BACKEND_URL} from '../../config'
import errorActions from '../../generic/ErrorMessage/actions'

import actions from './actions'

function* loadNichePageFlow({payload: subPageForRequest}) {
    try {
        const response = yield fetch(`${BACKEND_URL}/get-page-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({pageCode: 'all-movies', subPageCode: subPageForRequest}),
        })

        if (response.status !== 200)
            throw new Error(`Response status is ${response.status} (not 200)`)

        yield put(actions.loadPageSuccess({subPageForRequest, data: yield response.json()}))
    } catch (err) {
        console.error('loadNichePageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    yield put(push(payload.stringifiedQS))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadNichePageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
