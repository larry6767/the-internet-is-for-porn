import {createActions} from '../helpers'

const actions = createActions('VIDEO_PAGE', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'CLOSE_ADVERTISEMENT',
    'TOGGLE_REPORT_DIALOG',
    'SEND_REPORT_REQUEST',
    'SEND_REPORT_SUCCESS',
    'SEND_REPORT_FAILURE',
])

export default actions
