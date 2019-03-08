import {createActions} from '../../helpers'

const actions = createActions('SEARCH', [
    'SUGGESTIONS_FETCH_REQUEST',
    'SET_NEW_SUGGESTIONS',
    'SET_EMPTY_SUGGESTIONS',
    'RUN_SEARCH',
])

export default actions
