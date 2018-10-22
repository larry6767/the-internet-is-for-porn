import {videos as defaultVideos, video} from '../fixtures'
import {SELECT_VIDEO, CLOSE_VIDEO} from '../constants'

export default (videos = defaultVideos, action) => {
    const {type, payload} = action
    switch (type) {
    case SELECT_VIDEO:
        let currentItem = payload.ref.current
        while (currentItem.getBoundingClientRect().right < document.documentElement.clientWidth - 50) {
            if (currentItem.nextSibling) {
                currentItem = currentItem.nextSibling
            } else {
                break
            }
        }

        let targetItemId = currentItem.getAttribute('data-id')
        videos = videos.slice(0)
        if (~videos.findIndex((item) => item.player)) {
            videos.splice(videos.findIndex((item) => item.player), 1)
        }
        videos.splice(videos.findIndex((item) => item.id === targetItemId) + 1, 0, video)

        videos = videos.map((item) => {
            if (item.id === payload.id) {
                let clone = Object.assign({}, item)
                clone.selected = true
                return clone
            } else if (item.selected) {
                let clone = Object.assign({}, item)
                clone.selected = false
                return clone
            }
            return item
        })
        return videos
    
    case CLOSE_VIDEO:
        videos = videos.slice(0)
        if (~videos.findIndex((item) => item.player)) {
            videos.splice(videos.findIndex((item) => item.player), 1)
        }

        videos = videos.map((item) => {
            if (item.selected) {
                let clone = Object.assign({}, item)
                clone.selected = false
                return clone
            }
            return item
        })
        return videos

    default: break
    }

    return videos
}

// it's not so clear code and i understand it, but later i'll be rewrite do this with immutable.js