import {put, takeEvery, select} from 'redux-saga/effects'

import {
    obtainPageData,
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from '../helpers'

import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import reportDialogActions from '../ReportDialog/actions'

export function* loadVideoPageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),

            reportData = isSSR ? null : {
                href: window.location.href,
                time: new Date().toLocaleString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })
            }

        const
            data = yield obtainPageData(ssrContext, 'video', pageRequestParams)

        if ( ! isSSR)
            yield put(reportDialogActions.setTimeAndHref(reportData))

        if (isSSR)
            yield put(headerActions.setNewText(getHeaderText(data, false, false)))

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadAllMoviesPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadVideoPageFlow)
}
