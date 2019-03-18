import {put, takeEvery, select} from 'redux-saga/effects'

// local libs
import {
    obtainPageData,
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
    get404PageText,
} from 'src/App/helpers'

import errorActions from 'src/generic/ErrorMessage/actions'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/NotFound/actions'

export function* loadNotFoundPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'notFound', pageRequestParams)

        if (isSSR) {
            const
                i18nPageText = yield select(x => get404PageText(x))
            // getting i18nPageText from store (NOT from backend like all other pages),
            yield put(headerActions.setNewText(getHeaderText(i18nPageText, true)))
        }

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadNotFoundPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadNotFoundPageFlow)
}
