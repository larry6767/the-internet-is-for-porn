import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {nichePageCode} from '../../../api-page-codes'
import {getPageData} from '../../helpers'
import errorActions from '../../../generic/ErrorMessage/actions'

import actions from './actions'

export function* loadNichePageFlow({payload: subPageForRequest}, ssrContext) {
    const reqData = {pageCode: nichePageCode, subPageCode: subPageForRequest}
    let data

    try {
        if (yield select(x => x.getIn(['app', 'ssr', 'isSSR']))) {
            data = yield ssrContext.getPageData(reqData)
        } else {
            const response = yield getPageData(reqData)

            if (response.status !== 200)
                throw new Error(`Response status is ${response.status} (not 200)`)

            data = yield response.json()
        }

        yield put(actions.loadPageSuccess({subPageForRequest, data}))
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
