import {createActions} from '../helpers'

const actions = createActions('FAVORITE_PORNSTARS', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
    'ADD_VIDEO',
    'REMOVE_VIDEO',
])

export default actions
