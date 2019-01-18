import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {
    getHeaderText,
    getPageData,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from '../../helpers'

import {routerGetters} from '../../../router-builder'
import errorActions from '../../../generic/ErrorMessage/actions'
import headerActions from '../../MainHeader/actions'
import actions from './actions'

export function* loadNichePageFlow({payload: subPageForRequest}, ssrContext) {
    try {
        const reqData = yield select(x => ({
            localeCode: ig(x, 'app', 'locale', 'localeCode'),
            pageCode: ig(x, 'app', 'locale', 'pageCode', 'niche'),
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
        newSortValue = g(payload, 'newSortValue')

    yield put(push(
        archiveParams === null
        ? routerGetters.niche.link(
            routerContext,
            nicheCode,
            {ordering: newSortValue, pagination: null}
        )
        : routerGetters.nicheArchive.link(
            routerContext,
            nicheCode,
            g(archiveParams, 'year'),
            g(archiveParams, 'month'),
            {ordering: newSortValue, pagination: null}
        )
    ))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadNichePageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
