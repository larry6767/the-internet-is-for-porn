import {createActions} from '../helpers'

const actions = createActions('ALL_MOVIES', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'SET_NEW_SORT',
])

export default actions
