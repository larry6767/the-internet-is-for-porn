import {get} from 'lodash'
import {put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {animateScroll} from 'react-scroll'

import {
    obtainPageData,
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from '../helpers'

import {BACKEND_URL} from '../../config'
import errorActions from '../../generic/ErrorMessage/actions'
import headerActions from '../MainHeader/actions'
import actions from './actions'

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
            yield put(actions.setTimeAndHrefForReport(reportData))

        yield put(headerActions.setNewText(getHeaderText(data, false, false)))
        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadAllMoviesPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export function* sendReportFlow({payload: formData}) {
    try {
        const
            reqData = yield select(x => ({
                localeCode: ig(x, 'app', 'locale', 'localeCode'),
                orientationCode: ig(x, 'app', 'mainHeader', 'niche', 'currentOrientation'),
                ...formData.toJS()
            })),

            data = yield fetch(`${BACKEND_URL}/send-report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(reqData),
            }).then(response => {
                if ( ! response.ok)
                    throw new Error(`Response is not OK (status code is ${response.status})`)

                return response.json()
            })

        if (get(data, 'success') === true) {
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

export function scrollToPlayerFlow({payload}) {
    const player = g(payload, 'playerRef', 'current')
    animateScroll.scrollTo(player ? player.offsetTop : 0, {
        duration: 500,
        delay: 500,
        smooth: true,
    })
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadVideoPageFlow)
    yield takeEvery(actions.sendReportRequest, sendReportFlow)
    yield takeLatest(actions.scrollToPlayer, scrollToPlayerFlow)
}
