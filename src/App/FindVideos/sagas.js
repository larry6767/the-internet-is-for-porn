import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {
    getProvedPageKey,
    getHeaderText,
    getPageData,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
} from '../helpers'

import {routerGetters} from '../../router-builder'
import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'

export function* loadFindVideosPageFlow(action, ssrContext) {
    try {
        const reqData = yield select(x => ({
            localeCode: ig(x, 'app', 'locale', 'localeCode'),
            orientationCode: g(action, 'payload', 'orientationCode'),
            page: getProvedPageKey('findVideos'),
            subPageCode: g(action, 'payload', 'subPageForRequest'),
        }))

        let data
        if (yield select(x => ig(x, 'app', 'ssr', 'isSSR')))
            data = yield ssrContext.getPageData(reqData)
        else
            data = yield getPageData(reqData)

        yield put(headerActions.setNewText(getHeaderText(data)))
        yield put(actions.loadPageSuccess({
            orientationCode: g(reqData, 'orientationCode'),
            subPageForRequest: g(reqData, 'subPageCode'),
            data: g(data, []),
        }))
    } catch (err) {
        console.error('loadFindVideosPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    const
        routerContext = yield select(state => getRouterContext(state)),
        newSortValue = g(payload, 'newSortValue')

    yield put(push(
        routerGetters.findVideos.link(
            routerContext,
            {ordering: newSortValue},
            ['ordering', 'searchQuery']
        )
    ))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadFindVideosPageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
