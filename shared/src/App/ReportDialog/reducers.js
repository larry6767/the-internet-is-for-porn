import {fromJS} from 'immutable'

// local libs
import {plainProvedGet as g, provedHandleActions} from 'src/App/helpers'
import {model} from 'src/App/ReportDialog/models'
import actions from 'src/App/ReportDialog/actions'

export default
    provedHandleActions(model, {
        [g(actions, 'sendReportRequest')]: state => state.merge({
            isSending: true,
            isSent: false,
            isNotSent: false,
        }),
        [g(actions, 'sendReportSuccess')]: state => state.merge({
            isSending: false,
            isSent: true,
            isNotSent: false,
        }),
        [g(actions, 'sendReportFailure')]: state => state.merge({
            isSending: false,
            isSent: false,
            isNotSent: true,
        }),
        [g(actions, 'toggleReportDialog')]: state =>
            state.set('isOpen', !state.get('isOpen')),
        [g(actions, 'setTimeAndHref')]: (state, {payload: {href, time}}) =>
            state.merge({
                currentHref: href,
                currentTime: time,
            }),
    }, fromJS({
        isSending: false,
        isSent: false,
        isNotSent: false,
        currentHref: '',
        currentTime: '',
        isOpen: false,
    }))
