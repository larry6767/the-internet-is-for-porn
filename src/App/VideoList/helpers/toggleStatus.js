// delete status of the selected video and add status to the newly selected video
export default (state, action, videos) => {        
    videos = videos.map((item) => {
        if (action.payload && action.payload.id && item.id === action.payload.id) {
            item.selected = true
        } else if (item.selected) {
            item.selected = false
        }
        return item
    })
}
