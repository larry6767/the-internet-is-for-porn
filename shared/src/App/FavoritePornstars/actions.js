import {createActions} from 'src/App/helpers'

const actions = createActions('FAVORITE_PORNSTARS', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'ADD_TO_LIST',
    'REMOVE_FROM_LIST',
])

export default actions
