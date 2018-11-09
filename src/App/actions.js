import {createAction} from 'redux-actions'

const
    types = {
        RESIZE : 'APP@RESIZE'
    },

    resize = createAction(types.RESIZE)

export {
    resize,
    types
}
