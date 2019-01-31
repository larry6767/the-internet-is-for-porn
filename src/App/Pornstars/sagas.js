import {put, takeEvery, select} from 'redux-saga/effects'

import {
    obtainPageData,
    plainProvedGet as g,
    immutableProvedGet as ig,
    getHeaderText,
} from '../helpers'
import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import pornstarSaga from './Pornstar/sagas'
import actions from './actions'

export function* loadPornstarsPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'pornstars', pageRequestParams)

        if (isSSR)
            yield put(headerActions.setNewText(getHeaderText(data)))

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadPornstarsPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadPornstarsPageFlow)
    yield pornstarSaga()
}
