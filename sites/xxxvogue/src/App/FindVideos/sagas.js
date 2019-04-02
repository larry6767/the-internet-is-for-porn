import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

// local libs
import {
    obtainPageData,
    getRandomWidthList,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from 'src/App/helpers'

import routerGetters from 'src/App/routerGetters'
import errorActions from 'src/generic/ErrorMessage/actions'
import actions from 'src/App/FindVideos/actions'

export function* loadFindVideosPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'findVideos', pageRequestParams)

        if (isSSR) {
            const
                randomWidthList = getRandomWidthList(g(data, 'nichesListWithThumb', 'length'))
            yield put(actions.setRandomWidthList({randomWidthList}))
        }

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
