import {createActions} from 'src/App/helpers'

const actions = createActions('SNACKBAR', [
    'CLOSE_ERROR_MESSAGE',
    'OPEN_ERROR_MESSAGE',
])

export default actions
