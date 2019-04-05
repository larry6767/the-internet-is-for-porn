import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

// local libs
import {
    obtainPageData,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    getRandomWidthList,
} from 'src/App/helpers'

import routerGetters from 'src/App/routerGetters'
import errorActions from 'src/generic/ErrorMessage/actions'
import actions from 'src/App/Niche/actions'

export function* loadNichePageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'niche', pageRequestParams)

        if (isSSR) {
            const
                randomWidthList = getRandomWidthList(g(data, 'nichesListWithThumb', 'length'))
            yield put(actions.setRandomWidthList({randomWidthList}))
        }

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadNichePageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    const
        routerContext = yield select(state => getRouterContext(state)),
        nicheCode = g(payload, 'nicheCode'),
        archiveParams = g(payload, 'archiveParams'),
        newSortValue = g(payload, 'newSortValue'),
        sortName = g(payload, 'sortName')

    yield put(push(
        archiveParams === null
        ? routerGetters.niche.link(
            routerContext,
            nicheCode,
            {[sortName]: newSortValue},
            ['ordering', 'sponsor', 'duration']
        )
        : routerGetters.nicheArchive.link(
            routerContext,
            nicheCode,
            g(archiveParams, 'year'),
            g(archiveParams, 'month'),
            {[sortName]: newSortValue},
            ['ordering', 'sponsor', 'duration']
        )
    ))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadNichePageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
