
// remove player if it's in the array
export default (state, videos) => {
    if (~videos.findIndex((item) => item.player)) {
        videos.splice(videos.findIndex((item) => item.player), 1)
    }
}
