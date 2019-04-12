import {createActions} from 'src/App/helpers'

const actions = createActions('NICHE', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'SET_NEW_SORT',
    'SET_RANDOM_WIDTH_LIST',
])

export default actions
