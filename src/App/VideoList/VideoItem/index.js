import React, {Component} from 'react'
import {IMG_PATH} from '../../../config'

class VideoItem extends Component {
    constructor(props) {
        super(props)

        this.videoItemRef = React.createRef()
    }

    render() {
        const {video} = this.props
        return (
            <li className={css.videoItem}
                ref = {this.videoItemRef}
                data-id = {video.get('id')}
            >
                <a className={css.thumbnail}
                    href = {video.get('link')}
                    style = {{backgroundImage: "url(" + IMG_PATH + video.get('imgName') + ")"}}
                    onClick = {this.handleVideo.bind(this, video.get('id'), this.videoItemRef)}
                >
                    <div className={css.hdIcon}></div>
                    <div className={css.like}></div>
                    <div className={css.thumbnailBottom}>
                        <div className={css.categories}>{video.get('categories').join(', ')}</div>
                        <div className={css.duration}>{video.get('duration')}</div>
                    </div>
                </a>
                <div className={css.titleWrapper}>
                    <a className={css.title}
                        href = {video.get('link')}
                        onClick = {this.handleVideo.bind(this, video.get('id'), this.videoItemRef)}
                    >{video.title}</a>
                    <a className={css.source}
                        href = {video.get('link')}
                        onClick = {this.handleVideo.bind(this, video.get('id'), this.videoItemRef)}
                    >{video.source}</a>
                </div>
                <div className={video.selected ? `${css.triangle} ${css.triangleShown}` : css.triangle}></div>
            </li> 
        )
    }

    handleVideo = (id, videoItemRef) => {
        this.props.selectVideo(id, videoItemRef)
    }
}

export default VideoItem
