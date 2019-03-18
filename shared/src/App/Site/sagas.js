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
import actions from 'src/App/Site/actions'

export function* loadSitePageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'site', pageRequestParams)

        if (isSSR)
            yield put(headerActions.setNewText(getHeaderText(g(data, 'pageText'))))

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadSitePageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

function* setNewSort({payload}) {
    const
        routerContext = yield select(state => getRouterContext(state)),
        siteCode = g(payload, 'siteCode'),
        newSortValue = g(payload, 'newSortValue')

    yield put(push(
        routerGetters.site.link(
            routerContext,
            siteCode,
            {ordering: newSortValue},
            ['ordering']
        )
    ))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadSitePageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
