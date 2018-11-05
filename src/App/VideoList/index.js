import React from 'react'
import VideoItem from './VideoItem'
import VideoPlayer from './VideoPlayer'
import {connect} from 'react-redux'
import css from './assets/_.module.scss'

const
    VideoList = ({videosUi}) => <ul className={css.videoList}>
        {
            videosUi.get('videos').map(video => {
                console.log(video)
                if (!video.player) {
                    return (
                        <VideoItem 
                            key = {video.get('id')}
                            video = {video}
                        />
                    )
                } else {
                    return (
                        <VideoPlayer
                            key = {video.get('id')}
                            video = {video}
                        />
                    )
                }
            })
        }
    </ul>

export default connect(
    state => ({
        videosUi: state.getIn(['app', 'videoList', 'ui'])
    })
)(VideoList)
