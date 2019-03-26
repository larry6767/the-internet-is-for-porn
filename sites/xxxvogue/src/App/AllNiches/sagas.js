import {put, takeEvery} from 'redux-saga/effects'

// local libs
import {
    obtainPageData,
    plainProvedGet as g,
} from 'src/App/helpers'

import errorActions from 'src/generic/ErrorMessage/actions'
import actions from 'src/App/AllNiches/actions'

export function* loadAllNichesPageFlow(action, ssrContext) {
    try {
        const
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'allNiches', pageRequestParams)

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadAllNichesPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadAllNichesPageFlow)
}
