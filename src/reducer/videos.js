import {videos as defaultVideos, videoPlayer} from '../fixtures'
import {SELECT_VIDEO, CLOSE_VIDEO} from '../constants'
import produce from 'immer'

export default produce((videos, action) => {
    if (!videos) {
        return defaultVideos
    }
    const {type, payload} = action
    switch (type) {
    case SELECT_VIDEO:
        removePlayer()
        
        // find the last item in a row
        let currentItem = payload.ref.current
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

        toggleStatus()
        break
    
    case CLOSE_VIDEO:
        removePlayer()
        toggleStatus()

        break

    default: break
    }

    // remove player if it's in the array
    function removePlayer() {
        if (~videos.findIndex((item) => item.player)) {
            videos.splice(videos.findIndex((item) => item.player), 1)
        }
    }

    // delete status of the selected video and add status to the newly selected video
    function toggleStatus() {
        videos = videos.map((item) => {
            if (payload && payload.id && item.id === payload.id) {
                item.selected = true
            } else if (item.selected) {
                item.selected = false
            }
            return item
        })
    }
})
