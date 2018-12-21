import {createActions} from '../helpers'

const actions = createActions('FAVORITE', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'ADD_TO_LIST',
    'REMOVE_FROM_LIST',
])

export default actions
