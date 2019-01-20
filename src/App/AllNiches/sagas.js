import {put, takeEvery, select} from 'redux-saga/effects'

import {
    getProvedPageKey,
    getPageData,
    plainProvedGet as g,
    immutableProvedGet as ig,
    getHeaderText,
} from '../helpers'

import nicheSaga from './Niche/sagas'
import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'

export function* loadAllNichesPageFlow(action, ssrContext) {
    try {
        const reqData = yield select(x => ({
            localeCode: ig(x, 'app', 'locale', 'localeCode'),
            orientationCode: g(action, 'payload', 'orientationCode'),
            page: getProvedPageKey('allNiches'),
        }))

        let data
        if (yield select(x => ig(x, 'app', 'ssr', 'isSSR')))
            data = yield ssrContext.getPageData(reqData)
        else
            data = yield getPageData(reqData)

        yield put(headerActions.setNewText(getHeaderText(data)))
        yield put(actions.loadPageSuccess({data, orientationCode: g(reqData, 'orientationCode')}))
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
