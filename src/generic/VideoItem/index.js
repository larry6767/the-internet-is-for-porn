import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose, setPropTypes} from 'recompose'
import {replace, set} from 'lodash'
import {withStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    ImmutablePropTypes,
    PropTypes,
} from '../../App/helpers'

import actions from '../../App/actions'
import {muiStyles} from './assets/muiStyles'
import {immutableVideoItemModel} from './models'

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

class PreviewThumbs extends Component {
    state = {
        currentThumb: 0,
        showed: false,
    }

    mouseEnter = () => {
        // preloading images
        this.props.thumbsLinks.map(x => set(new Image(), 'src', x)).toArray()

        // reset old timers in case they for some reason exists
        clearInterval(this.timeoutTimer)
        clearInterval(this.intervalTimer)

        this.timeoutTimer = setTimeout(() => {
            this.intervalTimer = setInterval(g(this, 'progress'), 500)
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
            currentThumb = g(this, 'state', 'currentThumb'),
            thumbsLinks = g(this, 'props', 'thumbsLinks')

        this.setState({
            currentThumb: g(thumbsLinks, 'size') - 1 > currentThumb ? currentThumb + 1 : 0
        })
    }

    render() {
        const
            thumbsLinks = g(this, 'props', 'thumbsLinks')

        return <VideoPreviewThumbs
            onMouseEnter={g(this, 'mouseEnter')}
            onMouseLeave={g(this, 'mouseLeave')}
            thumb={ig(thumbsLinks, g(this, 'state', 'currentThumb'))}
            showed={g(this, 'state', 'showed')}
        />
    }
}

const
    renderVideoPreview = (
        classes, x, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
    ) => <VideoPreview thumb={ig(x, 'thumb')}>
        {isSSR ? null : <Fragment>
            <LoadingProgress/>
            <PreviewThumbs thumbsLinks={thumbsLinks} />
        </Fragment>}

        <VideoPreviewBar>
            {isSSR ? null : <Like>
                {favoriteVideoList.find(id => id === ig(x, 'id'))
                    ? <Favorite
                        classes={{root: g(classes, 'favoriteIcon')}}
                        onClick={removeVideoFromFavoriteHandler(ig(x, 'id'))}
                    />
                    : <FavoriteBorder
                        classes={{root: g(classes, 'favoriteBorderIcon')}}
                        onClick={addVideoToFavoriteHandler(x)}
                    />
                }
            </Like>}

            <Duration>
                <Typography
                    variant="body2"
                    classes={{
                        root: g(classes, 'typography')
                    }}
                >
                    {ig(x, 'duration')}
                </Typography>
            </Duration>
        </VideoPreviewBar>
    </VideoPreview>,

    VideoItem = ({
        classes, x, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, favoriteVideoList,
    }) => {
        const
            thumbsLinks = ig(x, 'thumbs').map(thumb => replace(ig(x, 'thumbMask'), '{num}', thumb))

        return <Wrapper>
            {~ig(x, 'url').indexOf('http')
                ? <a
                    href={ig(x, 'url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={g(classes, 'routerLink')}
                >
                    {renderVideoPreview(
                        classes, x, isSSR, addVideoToFavoriteHandler,
                        removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
                    )}
                </a>
                : <Link
                    to={ig(x, 'url')}
                    className={g(classes, 'routerLink')}
                >
                    {renderVideoPreview(
                        classes, x, isSSR, addVideoToFavoriteHandler,
                        removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
                    )}
                </Link>}

            <InfoBlock>
                <Typography
                    variant="body1"
                    classes={{
                        root: g(classes, 'typographyTitle')
                    }}
                    title={ig(x, 'title')}
                >
                    {ig(x, 'title')}
                </Typography>
                <InfoBlockInner>
                    <Typography
                        variant="body2"
                        classes={{
                            root: g(classes, 'typographySource')
                        }}
                    >
                        {ig(x, 'sponsorId')}
                    </Typography>
                    <Typography
                        variant="body2"
                        classes={{
                            root: g(classes, 'typographyTags')
                        }}
                        title={ig(x, 'tags').join(', ')}
                    >
                        {ig(x, 'tagsShort')}
                    </Typography>
                </InfoBlockInner>
            </InfoBlock>
        </Wrapper>
    }

export default compose(
    connect(
        state => ({
            favoriteVideoList: ig(state, 'app', 'ui', 'favoriteVideoList'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
        }),
        dispatch => ({
            addVideoToFavoriteHandler: video => e => {
                e.preventDefault()
                dispatch(actions.addVideoToFavorite(video))
            },
            removeVideoFromFavoriteHandler: id => e => {
                e.preventDefault()
                dispatch(actions.removeVideoFromFavorite(id))
            }
        })
    ),
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        x: immutableVideoItemModel,
        addVideoToFavoriteHandler: PropTypes.func,
        removeVideoFromFavoriteHandler: PropTypes.func,
        favoriteVideoList: ImmutablePropTypes.listOf(PropTypes.number),
    })
)(VideoItem)
