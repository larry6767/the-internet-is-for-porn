import {put, takeEvery} from 'redux-saga/effects'

import {obtainPageData, plainProvedGet as g, getHeaderText} from '../helpers'
import nicheSaga from './Niche/sagas'
import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'

export function* loadAllNichesPageFlow(action, ssrContext) {
    try {
        const
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'allNiches', pageRequestParams)

        yield put(headerActions.setNewText(getHeaderText(data)))
        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadAllNichesPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadAllNichesPageFlow)
    yield nicheSaga()
}
