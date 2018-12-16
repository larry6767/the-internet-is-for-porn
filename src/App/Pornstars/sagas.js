import {put, takeEvery, select} from 'redux-saga/effects'

import {pornstarsPageCode} from '../../api-page-codes'
import {getPageData} from '../helpers'
import errorActions from '../../generic/ErrorMessage/actions'

import pornstarSaga from './Pornstar/sagas'
import actions from './actions'

export function* loadPornstarsPageFlow(action, ssrContext) {
    try {
        const reqData = {pageCode: pornstarsPageCode}
        let data

        if (yield select(x => x.getIn(['app', 'ssr', 'isSSR'])))
            data = yield ssrContext.getPageData(reqData)
        else
            data = yield getPageData(reqData)

        yield put(actions.loadPageSuccess({data}))
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
