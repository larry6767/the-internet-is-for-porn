import {put, takeEvery} from 'redux-saga/effects'

import {obtainPageData, plainProvedGet as g} from '../helpers'
import errorActions from '../../generic/ErrorMessage/actions'
import actions from './actions'

export function* loadNotFoundPageFlow(action, ssrContext) {
    try {
        const
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'notFound', pageRequestParams)

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadNotFoundPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadNotFoundPageFlow)
}
