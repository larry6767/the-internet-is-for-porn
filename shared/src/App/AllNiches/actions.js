import {createActions} from 'src/App/helpers'

const actions = createActions('ALL_NICHES', [
    'LOAD_PAGE_REQUEST',
    'LOAD_PAGE_SUCCESS',
    'LOAD_PAGE_FAILURE',
])

export default actions
