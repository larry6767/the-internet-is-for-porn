import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

// local libs
import {
    obtainPageData,
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from 'src/App/helpers'

import routerGetters from 'src/App/routerGetters'
import errorActions from 'src/generic/ErrorMessage/actions'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/FindVideos/actions'

export function* loadFindVideosPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'findVideos', pageRequestParams)

        if (isSSR)
            yield put(headerActions.setNewText(getHeaderText(g(data, 'pageText'))))

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
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
