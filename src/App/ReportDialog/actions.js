import {createActions} from '../helpers'

const actions = createActions('DIALOG', [
    'TOGGLE_REPORT_DIALOG',
    'SEND_REPORT_REQUEST',
    'SEND_REPORT_SUCCESS',
    'SEND_REPORT_FAILURE',
    'SET_TIME_AND_HREF',
])

export default actions
