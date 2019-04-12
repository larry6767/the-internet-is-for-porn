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
import actions from 'src/App/Pornstar/actions'

export function* loadPornstarPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'pornstar', pageRequestParams)

        if (isSSR) {
            const
                randomWidthList = getRandomWidthList(g(data, 'nichesListWithThumb', 'length'))
            yield put(actions.setRandomWidthList({randomWidthList}))
        }

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadPornstarPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    const
        routerContext = yield select(state => getRouterContext(state)),
        pornstarCode = g(payload, 'pornstarCode'),
        newSortValue = g(payload, 'newSortValue')

    yield put(push(routerGetters.pornstar.link(
        routerContext,
        pornstarCode,
        {ordering: newSortValue},
        ['ordering']
    )))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadPornstarPageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
