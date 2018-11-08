import {createAction} from 'redux-actions'

const
    types = {
        // TODO give it better name (like "go to menu link" or smth like that)
        TOGGLE_NAVIGATION: 'NAVIGATION@TOGGLE_NAVIGATION'
    },

    toggleNavigation = createAction(types.TOGGLE_NAVIGATION)

export {
    toggleNavigation,
    types
}
