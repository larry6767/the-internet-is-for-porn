import React, {Component} from 'react'
import {connect} from 'react-redux'
import {closeVideo} from '../AC'

class VideoItem extends Component {
    render() {
        const {video, closeVideo} = this.props
        return (
            <div className="video-player">
                <div className="video-player__prev"></div>
                <div className="video-player__next"></div>
                <div className="video-player__close" onClick={closeVideo}></div>
                <div className="video-player__inner">
                    <div className="video-player__left"></div>
                    <div className="video-player__right">
                        <div className="video-player__title">{video.title}</div>
                        <div className="video-player__source">{video.source}</div>
                        <div className="video-player__buttons-wrapper">
                            <div className="video-player__button button button--like">Like</div>
                            <div className="video-player__button button button--share">Share</div>
                            <div className="video-player__button button button--report">Report</div>
                        </div>
                        <div className="video-player__categories">
                            <a href="" className="video-player__category">Babe</a>
                            <a href="" className="video-player__category">Amateur</a>
                            <a href="" className="video-player__category">Hardcore</a>
                        </div>
                        <div className="video-player__similar-videos similar-videos">
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__item"></div>
                            <div className="similar-videos__view-more">View more</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {closeVideo})(VideoItem)
