import {createActions} from 'src/App/helpers'

const actions = createActions('LANGUAGE', [
    'LOAD_SITE_LOCALES_REQUEST',
    'LOAD_SITE_LOCALES_SUCCESS',
    'LOAD_SITE_LOCALES_FAILURE',

    'SET_NEW_LANGUAGE',
])

export default actions
