import {createAction} from 'redux-actions'

const
    types = {
        TOGGLE_SEARCH: 'MAIN_HEADER@TOGGLE_SEARCH'
    },

    toggleSearch = createAction(types.TOGGLE_SEARCH)

export {
    toggleSearch,
    types
}
