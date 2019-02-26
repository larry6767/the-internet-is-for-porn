import React, {Component, Fragment} from 'react'
import {compose, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
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
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointXS as xs,
    breakpoints,
} from '../../App/helpers'

import {muiStyles} from './assets/muiStyles'
import {immutableVideoItemModel} from './models'

import {
    StyledLink,
    StyledLinkBlock,
    ProviderLink,
    NativeLink,
    Wrapper,
    VideoPreview,
    VideoPreviewBar,
    InfoBlock,
    InfoBlockInner,
    TagsBlock,
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
            {renderLink(g(this.props, 'x'), g(this.props, 'getVideoLink'))}
        </VideoPreviewThumbs>
    }
}

const
    renderLink = (x, getVideoLink) => typeof ig(x, 'videoPageRef') === 'string' // external resource
        ? <NativeLink href={ig(x, 'videoPageRef')} target="_blank" rel="noopener noreferrer"/>
        : <StyledLinkBlock to={getVideoLink(x)}/>,

    renderProviderLink = (classes, x, getSearchLink, isInline = false) => <ProviderLink
        to={getSearchLink(ig(x, 'sponsorLink'))}
        isInline={isInline}
    >
        <Typography
            variant="body2"
            className={isInline ? g(classes, 'typographySourceContrast') :
                g(classes, 'typographySource')}
        >
            {ig(x, 'sponsorName')}
        </Typography>
    </ProviderLink>,

    renderVideoPreview = (
        classes, x, cb, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, isThisVideoFavorite, thumbsLinks,
        getSearchLink, getVideoLink,
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

        {isSSR ? renderLink(x, getVideoLink) : null}

        <VideoPreviewBar>
            {isSSR ? null : ccb(cb, xs) === 0
                ? renderProviderLink(classes, x, getSearchLink, true)
                : <Like>
                    {isThisVideoFavorite
                        ? <Favorite
                            className={g(classes, 'favoriteIcon')}
                            data-favorite-video-id={ig(x, 'id')}
                            onClick={removeVideoFromFavoriteHandler}
                        />
                        : <FavoriteBorder
                            className={g(classes, 'favoriteBorderIcon')}
                            data-favorite-video-id={ig(x, 'id')}
                            onClick={addVideoToFavoriteHandler}
                        />
                    }
                </Like>}

            <Duration>
                <Typography variant="body2" className={g(classes, 'typography')}>
                    {ig(x, 'duration')}
                </Typography>
            </Duration>
        </VideoPreviewBar>
    </VideoPreview>,

    VideoItem = ({
        classes, x, cb, getVideoLink, getSearchLink, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, isThisVideoFavorite,
    }) => {
        const
            thumbsLinks = ig(x, 'thumbs').map(thumb => replace(ig(x, 'thumbMask'), '{num}', thumb))

        return <Wrapper>
            {renderVideoPreview(
                classes, x, cb, isSSR, addVideoToFavoriteHandler,
                removeVideoFromFavoriteHandler, isThisVideoFavorite, thumbsLinks,
                getSearchLink, getVideoLink,
            )}

            <InfoBlock>
                <Typography
                    variant="body1"
                    className={g(classes, 'typographyTitle')}
                    title={ig(x, 'title')}
                >
                    {ig(x, 'title')}
                </Typography>
                <InfoBlockInner>
                    {ccb(cb, xs) === 0 ? null : renderProviderLink(classes, x, getSearchLink)}

                    <TagsBlock>
                        {ig(x, 'tagsShort').map(x => <StyledLink key={x} to={getSearchLink(x)}>
                            {x}
                        </StyledLink>)}
                    </TagsBlock>
                </InfoBlockInner>
            </InfoBlock>
        </Wrapper>
    }

export default compose(
    withStyles(muiStyles),
    withPropsOnChange(['x', 'favoriteVideoList'], props => ({
        isThisVideoFavorite: Boolean(
            g(props, 'favoriteVideoList').find(id => id === ig(g(props, 'x'), 'id'))
        ),
    })),
    onlyUpdateForKeys(['cb', 'x', 'isThisVideoFavorite']),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            typography: PropTypes.string,
            typographyTitle: PropTypes.string,
            typographyTags: PropTypes.string,
            typographySource: PropTypes.string,
            typographySourceContrast: PropTypes.string,
            favoriteBorderIcon: PropTypes.string,
            favoriteIcon: PropTypes.string,
        }),

        isSSR: PropTypes.bool,
        cb: PropTypes.oneOf(breakpoints),
        x: immutableVideoItemModel,
        favoriteVideoList: ImmutablePropTypes.listOf(PropTypes.number),

        addVideoToFavoriteHandler: PropTypes.func,
        removeVideoFromFavoriteHandler: PropTypes.func,
        getVideoLink: PropTypes.func,
        getSearchLink: PropTypes.func,
    })
)(VideoItem)
