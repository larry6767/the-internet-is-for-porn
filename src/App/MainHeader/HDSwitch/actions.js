import {createAction} from 'redux-actions'

const
    types = {
        TOGGLE_HD: 'HDSWITCH@TOGGLE_HD'
    },

    toggleHD = createAction(types.TOGGLE_HD)

export {
    toggleHD,
    types
}
