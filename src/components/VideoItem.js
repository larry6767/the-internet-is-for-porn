import React, {Component} from 'react'
import {IMG_PATH} from '../constants'
import {connect} from 'react-redux'
import {selectVideo} from '../AC'

class VideoItem extends Component {
    constructor(props) {
        super(props);

        this.videoItemRef = React.createRef();
    }

    render() {
        const {video} = this.props
        return (
            <li className="video-item"
                ref = {this.videoItemRef}
                data-id = {video.id}
            >
                <a className="video-item__thumbnail"
                    href = {video.link}
                    style = {{backgroundImage: "url(" + IMG_PATH + video.imgName + ")"}}
                    onClick = {this.handleVideo.bind(this, video.id, this.videoItemRef)}
                >
                    <div className="video-item__hd-icon"></div>
                    <div className="video-item__like"></div>
                </a>
                <div className="video-item__title-wrapper">
                    <a className="video-item__title"
                        href = {video.link}
                        onClick = {this.handleVideo.bind(this, video.id, this.videoItemRef)}
                    >{video.title}</a>
                    <a className="video-item__source"
                        href = {video.link}
                        onClick = {this.handleVideo.bind(this, video.id, this.videoItemRef)}
                    >{video.source}</a>
                </div>
                <div className={video.selected ? 'video-item__triangle video-item__triangle--shown' : 'video-item__triangle'}></div>
            </li> 
        )
    }

    handleVideo = (id, videoItemRef) => {
        this.props.selectVideo(id, videoItemRef)
    }
}

export default connect(null, {selectVideo})(VideoItem)
