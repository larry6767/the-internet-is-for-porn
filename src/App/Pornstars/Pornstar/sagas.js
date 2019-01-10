import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {getPageData, immutableProvedGet as ig} from '../../helpers'
import errorActions from '../../../generic/ErrorMessage/actions'

import actions from './actions'

export function* loadPornstarPageFlow({payload: subPageForRequest}, ssrContext) {
    try {
        const reqData = yield select(x => ({
            localeCode: ig(x, 'app', 'locale', 'localeCode'),
            pageCode: ig(x, 'app', 'locale', 'pageCode', 'pornstar'),
            subPageCode: subPageForRequest,
        }))

        let data
        if (yield select(x => ig(x, 'app', 'ssr', 'isSSR')))
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
