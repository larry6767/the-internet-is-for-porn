import {createActions} from 'src/App/helpers'

const actions = createActions('FAVORITE', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'ADD_TO_LIST',
    'REMOVE_FROM_LIST',
    'SET_RANDOM_WIDTH_LIST',
])

export default actions
