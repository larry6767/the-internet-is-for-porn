import {get} from 'lodash'
import {put, takeEvery, select} from 'redux-saga/effects'

import {immutableProvedGet as ig} from '../helpers'

import {BACKEND_URL} from '../../config'
import errorActions from '../../generic/ErrorMessage/actions'
import actions from './actions'

export function* sendReportFlow({payload: formData}) {
    try {
        const
            reqData = yield select(x => ({
                localeCode: ig(x, 'app', 'locale', 'localeCode'),
                orientationCode: ig(x, 'app', 'mainHeader', 'niche', 'currentOrientation'),
                ...formData
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

export function* toggleReportDialogFlow() {
    if ( ! (yield select(x => ig(x, 'app', 'reportDialog', 'isOpen'))))
        yield put(actions.setTimeAndHref({
            href: window.location.href,
            time: new Date().toLocaleString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            })
        }))

    yield put(actions.toggleReportDialog())
}

export default function* saga() {
    yield takeEvery(actions.sendReportRequest, sendReportFlow)
    yield takeEvery(actions.toggleReportDialogFlow, toggleReportDialogFlow)
}
