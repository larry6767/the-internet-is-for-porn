import {put, takeEvery, select} from 'redux-saga/effects'

import {getPageData} from '../helpers'
import errorActions from '../../generic/ErrorMessage/actions'

import actions from './actions'

export function* loadFavoritePageFlow({payload: pageCode}, ssrContext) {
    try {
        const reqData = {pageCode: pageCode}
        let data

        if (yield select(x => x.getIn(['app', 'ssr', 'isSSR'])))
            data = yield ssrContext.getPageData(reqData)
        else
            data = yield getPageData(reqData)

        yield put(actions.loadPageSuccess({data}))
    } catch (err) {
        console.error('loadFavoritePageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadFavoritePageFlow)
}
