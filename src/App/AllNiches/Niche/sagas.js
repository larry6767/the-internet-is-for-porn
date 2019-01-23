import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {
    getProvedPageKey,
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

export function* loadNichePageFlow(action, ssrContext) {
    try {
        const reqData = yield select(x => ({
            localeCode: ig(x, 'app', 'locale', 'localeCode'),
            orientationCode: g(action, 'payload', 'orientationCode'),
            page: getProvedPageKey('niche'),
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
            data,
        }))
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
            {ordering: newSortValue},
            ['ordering']
        )
        : routerGetters.nicheArchive.link(
            routerContext,
            nicheCode,
            g(archiveParams, 'year'),
            g(archiveParams, 'month'),
            {ordering: newSortValue},
            ['ordering']
        )
    ))
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadNichePageFlow)
    yield takeEvery(actions.setNewSort, setNewSort)
}
