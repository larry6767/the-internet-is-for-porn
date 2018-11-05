import {videos as defaultVideos, videoPlayer} from './fixtures'

import {combineReducers} from 'redux-immutable'
import {selectVideo} from './actions'
import {closeVideo} from './actions'

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

import {removePlayer, toggleStatus} from './helpers'

export default combineReducers({

    // VideoList UI state reducer
    ui: handleActions({
        [selectVideo]: (state, action) => {
            const
                videos = state.get('videos')

            removePlayer(state, videos)
        
            // find the last item in a row
            let currentItem = action.payload.ref.current
            while (currentItem.getBoundingClientRect().right < document.documentElement.clientWidth - 50) {
                if (currentItem.nextSibling) {
                    currentItem = currentItem.nextSibling
                } else {
                    break
                }
            }
    
            // insert player after last item in a row
            let targetItemId = currentItem.getAttribute('data-id')
            videos.splice(videos.findIndex((item) => item.id === targetItemId) + 1, 0, videoPlayer)
    
            toggleStatus(state, action, videos)
        },
        [closeVideo]: (state, action) => {
            const
                videos = state.get('videos')

            removePlayer(state, videos)
            toggleStatus(state, action, videos)            
        }
    }, fromJS({videos: defaultVideos}))
})
