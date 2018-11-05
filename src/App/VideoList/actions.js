import {createAction} from 'redux-actions'

const
    types = {
        SELECT_VIDEO: 'VIDEO_LIST@SELECT_VIDEO',
        CLOSE_VIDEO: 'VIDEO_LIST@CLOSE_VIDEO'
    },

    selectVideo = createAction(types.SELECT_VIDEO),
    closeVideo = createAction(types.CLOSE_VIDEO)

export {
    selectVideo,
    closeVideo,
    types
}
