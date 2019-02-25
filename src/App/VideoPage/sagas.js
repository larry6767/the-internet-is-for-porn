import {put, takeEvery, select} from 'redux-saga/effects'

import {
    obtainPageData,
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from '../helpers'

import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'

export function* loadVideoPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams')

        const
            data = yield obtainPageData(ssrContext, 'video', pageRequestParams)

        if (isSSR)
            yield put(headerActions.setNewText(getHeaderText(g(data, 'pageText'), false, false)))

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadVideoPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadVideoPageFlow)
}
