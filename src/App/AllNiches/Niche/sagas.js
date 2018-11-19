import {map, reverse} from "lodash"
import {put, takeEvery} from 'redux-saga/effects'
import actions from './actions'
import errorActions from '../../../generic/ErrorMessage/actions'

function* loadPageFlow() {
    try {
        const response = yield fetch('/react', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                operation: 'getPageDataByUrl',
                params: {'url': '/3d-porn.html'}
            }),
        })

        if (response.status !== 200)
            throw new Error(`Response status is ${response.status} (not 200)`)

        const json = yield response.json()

        const tagArchiveList = reverse(map(json.page.TAG_ARCHIVE_LIST_FULL, x => {
            x.month = json.page.MONTHS_NAMES[Number(x.month) < 10
                ? x.month.slice(1)
                : x.month
            ]
            return x
        }))

        yield put(actions.loadPageSuccess(tagArchiveList))
    } catch (err) {
        console.error('loadPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadPageFlow)
}
