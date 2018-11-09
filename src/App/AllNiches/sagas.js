import {map, pick} from "lodash"
import {put, takeEvery} from 'redux-saga/effects'
import actions from './actions'

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
                params: {'url': '/?categories'}
            }),
        })

        if (response.status !== 200)
            throw new Error(`Response status is ${response.status} (not 200)`)

        const json = yield response.json()

        yield put(actions.loadPageSuccess(map(
            json.page.TAGS_INFO.items,
            x => pick(x, ['id', 'name', 'sub_url', 'items_count'])
        )))
    } catch (err) {
        console.error('loadPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadPageFlow)
}
