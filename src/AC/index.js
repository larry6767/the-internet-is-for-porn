import {
    SELECT_VIDEO,
    CLOSE_VIDEO
} from '../constants'

export function selectVideo(id, ref) {
    return {
        type: SELECT_VIDEO,
        payload: {id, ref}
    }
}

export function closeVideo() {
    return {
        type: CLOSE_VIDEO
    }
}