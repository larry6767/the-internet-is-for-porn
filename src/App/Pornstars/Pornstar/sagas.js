import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {pornstarPageCode} from '../../../api-page-codes'
import {getPageData} from '../../helpers'
import errorActions from '../../../generic/ErrorMessage/actions'

import actions from './actions'

export function* loadPornstarPageFlow({payload: subPageForRequest}, ssrContext) {
    try {
        const reqData = {pageCode: pornstarPageCode, subPageCode: subPageForRequest}
        let data

        if (yield select(x => x.getIn(['app', 'ssr', 'isSSR'])))
            data = yield ssrContext.getPageData(reqData)
        else
            data = yield getPageData(reqData)

        yield put(actions.loadPageSuccess({subPageForRequest, data}))
    } catch (err) {
        console.error('loadPornstarPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    yield put(push(payload.stringifiedQS))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadPornstarPageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
