import {put, takeEvery, select} from 'redux-saga/effects'
import {BACKEND_URL} from '../../config'
import {videoPageCode} from '../../api-page-codes'
import {getPageData} from '../helpers'
import errorActions from '../../generic/ErrorMessage/actions'

import actions from './actions'

export function* loadVideoPageFlow({payload: subPageForRequest}, ssrContext) {
    try {
        const
            reqData = {pageCode: videoPageCode, subPageCode: subPageForRequest},
            href = window.location.href,
            time = new Date().toLocaleString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            })

        let data

        if (yield select(x => x.getIn(['app', 'ssr', 'isSSR'])))
            data = yield ssrContext.getPageData(reqData)
        else
            data = yield getPageData(reqData)

        yield put(actions.loadPageSuccess({subPageForRequest, data}))
        yield put(actions.setTimeAndHrefForReport({href, time}))
    } catch (err) {
        console.error('loadAllMoviesPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export function* sendReportFlow({payload: reqBody}) {
    try {
        const
            data = yield fetch(`${BACKEND_URL}/send-report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(reqBody),
            }).then(response => {
                if (response.status !== 200)
                    throw new Error(`Response status is ${response.status} (not 200)`)

                return response.json()
            })

        if (data && data.success === true) {
            yield put(actions.sendReportSuccess())
        } else {
            console.error('the report was not sent, try again')
            yield put(actions.sendReportFailure())
            yield put(errorActions.openErrorMessage())
        }
    } catch (err) {
        console.error('sendReportFlow is failed with exception:', err)
        yield put(actions.sendReportFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadVideoPageFlow)
    yield takeEvery(actions.sendReportRequest, sendReportFlow)
}
