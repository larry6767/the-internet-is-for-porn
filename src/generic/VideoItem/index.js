import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {replace} from 'lodash'
import {withStyles} from '@material-ui/core/styles'
import {
    Typography
} from '@material-ui/core'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import {
    Wrapper,
    VideoPreview,
    VideoPreviewBar,
    InfoBlock,
    InfoBlockInner,
    Like,
    Duration,
    VideoPreviewThumbs,
    LoadingProgress,
} from './assets'
import {muiStyles} from './assets/muiStyles'
import actions from '../../App/actions'

class PreviewThumbs extends Component {
    state = {
        currentThumb: 0,
        showed: false,
    }

    mouseEnter = () => {
        const
            imageArray = [],
            {thumbsLinks} = this.props

        thumbsLinks.forEach(x => {
            const image = new Image()
            image.src = x
            imageArray.push(image)
        })

        this.timeoutTimer = setTimeout(() => {
            this.intervalTimer = setInterval(this.progress, 500)
            this.setState({showed: true})
        }, 1000)
    }

    mouseLeave = () => {
        this.stopProgress()
    }

    componentWillUnmount() {
        this.stopProgress()
    }

    stopProgress = () => {
        clearInterval(this.timeoutTimer)
        clearInterval(this.intervalTimer)
        this.setState({
            currentThumb: 0,
            showed: false,
        })
    }

    progress = () => {
        const
            {currentThumb} = this.state,
            {thumbsLinks} = this.props

        this.setState({currentThumb: thumbsLinks.size - 1 > currentThumb
            ? currentThumb + 1
            : 0
        })
    }

    render() {
        const
            {thumbsLinks} = this.props

        return <VideoPreviewThumbs
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            thumb={thumbsLinks.get(this.state.currentThumb)}
            showed={this.state.showed}
        />
    }
}

const
    renderVideoPreview = (
        classes, x, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
    ) => <VideoPreview
        thumb={x.get('thumb')}
    >
        <LoadingProgress/>
        <PreviewThumbs
            thumbsLinks={thumbsLinks}
        />
        <VideoPreviewBar>
            <Like>
                {favoriteVideoList.find(id => id === x.get('id'))
                    ? <Favorite
                        classes={{root: classes.favoriteIcon}}
                        onClick={removeVideoFromFavoriteHandler.bind(this, x.get('id'))}
                    />
                    : <FavoriteBorder
                        classes={{root: classes.favoriteBorderIcon}}
                        onClick={addVideoToFavoriteHandler.bind(this, x)}
                    />
                }
            </Like>
            <Duration>
                <Typography
                    variant="body2"
                    classes={{
                        root: classes.typography
                    }}
                >
                    {`${Math.floor(x.get('duration') / 60)}:${
                        x.get('duration') % 60 < 10
                            ? '0' + x.get('duration') % 60
                            : x.get('duration') % 60}`}
                </Typography>
            </Duration>
        </VideoPreviewBar>
    </VideoPreview>,

    VideoItem = ({
        classes, x, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, favoriteVideoList,
    }) => {
        const
            thumbsLinks = x.get('thumbs').map(thumb => replace(x.get('thumbMask'), '{num}', thumb))

        return <Wrapper>
            {~x.get('url').indexOf('http')
                ? <a
                    href={x.get('url')}
                    target="_blank"
                    rel="nofollow noopener"
                    className={classes.routerLink}
                >
                    {renderVideoPreview(
                        classes, x, addVideoToFavoriteHandler,
                        removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
                    )}
                </a>
                : <Link
                    to={x.get('url')}
                    className={classes.routerLink}
                >
                    {renderVideoPreview(
                        classes, x, addVideoToFavoriteHandler,
                        removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
                    )}
                </Link>}

            <InfoBlock>
                <Typography
                    variant="body1"
                    classes={{
                        root: classes.typographyTitle
                    }}
                    title={x.get('title')}
                >
                    {x.get('title')}
                </Typography>
                <InfoBlockInner>
                    <Typography
                        variant="body2"
                        classes={{
                            root: classes.typographySource
                        }}
                    >
                        {x.get('sponsorId')}
                    </Typography>
                    <Typography
                        variant="body2"
                        classes={{
                            root: classes.typographyTags
                        }}
                        title={x.get('tags').join(', ')}
                    >
                        {x.get('tagsShort')}
                    </Typography>
                </InfoBlockInner>
            </InfoBlock>
        </Wrapper>
    }

export default compose(
    connect(
        state => ({
            favoriteVideoList: state.getIn(['app', 'ui', 'favoriteVideoList'])
        }),
        dispatch => ({
            addVideoToFavoriteHandler: (video, e) => {
                e.preventDefault()
                dispatch(actions.addVideoToFavorite(video))
            },
            removeVideoFromFavoriteHandler: (id, e) => {
                e.preventDefault()
                dispatch(actions.removeVideoFromFavorite(id))
            }
        })
    ),
    withStyles(muiStyles)
)(VideoItem)
