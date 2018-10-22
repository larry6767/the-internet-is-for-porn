import React, {Component} from 'react'
import VideoItem from './VideoItem'
import VideoPlayer from './VideoPlayer'
import {connect} from 'react-redux'

class VideoList extends Component {
    render() {
        const {videos} = this.props
        const videoElements = videos.map(video => {
            if (!video.player) {
                return (
                    <VideoItem 
                        key = {video.id}
                        video = {video}
                    />
                )
            } else {
                return (
                    <VideoPlayer
                        key = {video.id}
                        video = {video}
                    />
                )
            }
        })

        return (
            <ul className="video-list">
                {videoElements}
            </ul>
        )
    }
}

export default connect(({videos}) => ({videos}))(VideoList)
