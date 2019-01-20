import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {
    getProvedPageKey,
    getHeaderText,
    getPageData,
    immutableProvedGet as ig,
} from '../helpers'
import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'

export function* loadFindVideosPageFlow({payload: subPageForRequest}, ssrContext) {
    try {
        const reqData = yield select(x => ({
            localeCode: ig(x, 'app', 'locale', 'localeCode'),
            page: getProvedPageKey('findVideos'),
            subPageCode: subPageForRequest,
        }))

        let data
        if (yield select(x => ig(x, 'app', 'ssr', 'isSSR')))
            data = yield ssrContext.getPageData(reqData)
        else
            data = yield getPageData(reqData)

        yield put(headerActions.setNewText(getHeaderText(data)))
        yield put(actions.loadPageSuccess({subPageForRequest, data}))
    } catch (err) {
        console.error('loadFindVideosPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    yield put(push(payload.stringifiedQS))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadFindVideosPageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
