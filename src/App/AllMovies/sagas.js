import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {
    obtainPageData,
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from '../helpers'

import {routerGetters} from '../../router-builder'
import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'

export function* loadAllMoviesPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'allMovies', pageRequestParams)

        if (isSSR)
            yield put(headerActions.setNewText(getHeaderText(data)))

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadAllMoviesPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    const
        routerContext = yield select(state => getRouterContext(state)),
        archiveParams = g(payload, 'archiveParams'),
        newSortValue = g(payload, 'newSortValue')

    yield put(push(
        archiveParams === null
        ? routerGetters.allMovies.link(
            routerContext,
            {ordering: newSortValue},
            ['ordering']
        )
        : routerGetters.allMoviesArchive.link(
            routerContext,
            g(archiveParams, 'year'),
            g(archiveParams, 'month'),
            {ordering: newSortValue},
            ['ordering']
        )
    ))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadAllMoviesPageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
