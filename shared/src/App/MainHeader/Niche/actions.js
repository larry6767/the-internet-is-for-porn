import {createActions} from 'src/App/helpers'

const actions = createActions('ORIENTATION_NICHE', [
    'SWITCH_ORIENTATION', // for dropdown select, redirects on home route with orientation prefix
    'SET_ORIENTATION', // for "portal", to set orientation in state to one provided in a route
])

export default actions
