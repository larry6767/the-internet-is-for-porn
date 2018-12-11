import {createActions} from '../../helpers'

const actions = createActions('PORNSTAR', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'SET_NEW_SORT',
    'TOGGLE_MODEL_INFO',
])

export default actions
