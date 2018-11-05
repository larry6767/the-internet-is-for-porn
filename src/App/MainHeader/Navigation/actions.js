import {createAction} from 'redux-actions'

const
    types = {
        TOGGLE_NAVIGATION: 'NAVIGATION@TOGGLE_NAVIGATION'
    },

    toggleNavigation = createAction(types.TOGGLE_NAVIGATION)

export {
    toggleNavigation,
    types
}
