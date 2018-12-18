import {createActions} from './helpers'

const actions = createActions('APP', [
    'RESIZE',
    'GET_FAVORITE_VIDEO_LIST',
    'SET_FAVORITE_VIDEO_LIST',
    'ADD_VIDEO_TO_FAVORITE',
    'REMOVE_VIDEO_FROM_FAVORITE',
    'ADD_TO_FAVORITE_VIDEO_LIST',
    'REMOVE_FROM_FAVORITE_VIDEO_LIST',
])

export default actions
