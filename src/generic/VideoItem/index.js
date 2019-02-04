import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose, withHandlers} from 'recompose'
import {replace, set} from 'lodash'
import {withStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'

import {
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    ImmutablePropTypes,
    PropTypes,
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointXS as xs,
    breakpoints,
} from '../../App/helpers'

import {routerGetters} from '../../router-builder'
import {routerContextModel} from '../../App/models'
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
        >
            {renderLink(
                g(this.props, 'classes'),
                g(this.props, 'x'),
                g(this.props, 'getVideoLink')
            )}
        </VideoPreviewThumbs>
    }
}

const
    renderLink = (
        classes, x, getVideoLink
    ) => typeof ig(x, 'videoPageRef') === 'string' // external resource
        // eslint-disable-next-line
        ? <a
            href={ig(x, 'videoPageRef')}
            target="_blank"
            rel="noopener noreferrer"
            className={g(classes, 'routerLink')}
        />
        : <Link to={getVideoLink(x)} className={g(classes, 'routerLink')}/>,

    renderProviderLink = (classes, x, getProviderLink, isInline = false) => <Link
        to={getProviderLink(x)}
        className={isInline ? g(classes, 'routerLinkContrast') : g(classes, 'routerLinkGray')}
    >
        <Typography
            variant="body2"
            classes={{
                root: isInline
                    ? g(classes, 'typographySourceContrast') : g(classes, 'typographySource')
            }}
        >
            {ig(x, 'sponsorName')}
        </Typography>
    </Link>,

    renderVideoPreview = (
        classes, x, cb, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
        getProviderLink, getVideoLink,
    ) => <VideoPreview thumb={ig(x, 'thumb')}>
        {isSSR ? null : <Fragment>
            <LoadingProgress/>
            <PreviewThumbs
                thumbsLinks={thumbsLinks}
                classes={classes}
                x={x}
                getVideoLink={getVideoLink}
            />
        </Fragment>}

        {isSSR ? renderLink(classes, x, getVideoLink) : null}

        <VideoPreviewBar>
            {isSSR ? null : ccb(cb, xs) === 0
                ? renderProviderLink(classes, x, getProviderLink, true)
                : <Like>
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
        classes, x, cb, getVideoLink, getProviderLink, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, favoriteVideoList,
    }) => {
        const
            thumbsLinks = ig(x, 'thumbs').map(thumb => replace(ig(x, 'thumbMask'), '{num}', thumb))

        return <Wrapper>
            {renderVideoPreview(
                classes, x, cb, isSSR, addVideoToFavoriteHandler,
                removeVideoFromFavoriteHandler, favoriteVideoList, thumbsLinks,
                getProviderLink, getVideoLink,
            )}

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
                    {ccb(cb, xs) === 0 ? null : renderProviderLink(classes, x, getProviderLink)}

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
            routerContext: getRouterContext(state),
            cb: state.getIn(['app', 'ui', 'currentBreakpoint']),
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
    withHandlers({
        getVideoLink: props => x => routerGetters.video.link(
            g(props, 'routerContext'),
            ig(x, 'videoPageRef'),
            ig(x, 'title')
        ),

        getProviderLink: props => x => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            {searchQuery: `${ig(x, 'sponsorName')}${
                g(ig(x, 'tags'), 'size') ? ` ${ig(x, 'tags', 0)}` : ''}`},
            ['searchQuery'],
        ),
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        cb: PropTypes.oneOf(breakpoints),
        x: immutableVideoItemModel,
        favoriteVideoList: ImmutablePropTypes.listOf(PropTypes.number),

        addVideoToFavoriteHandler: PropTypes.func,
        removeVideoFromFavoriteHandler: PropTypes.func,
        getVideoLink: PropTypes.func,
        getProviderLink: PropTypes.func,
    })
)(VideoItem)
