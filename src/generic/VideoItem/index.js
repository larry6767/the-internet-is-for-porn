import React from 'react'

import {
    compose,
    onlyUpdateForKeys,
    withPropsOnChange,
    withState,
    withHandlers,
    lifecycle,
} from 'recompose'

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
} from './assets'

const
    renderLink = (x, getVideoLink, component) => typeof ig(x, 'videoPageRef') === 'string'
        // external resource
        ? <NativeLink href={ig(x, 'videoPageRef')} target="_blank" rel="noopener noreferrer">
            {component}
        </NativeLink>
        : <StyledLinkBlock to={getVideoLink(x)}>
            {component}
        </StyledLinkBlock>,

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

    VideoPreviewRender = compose(
        withPropsOnChange(['x'], props => {
            const
                thumbsCount = g(ig(props.x, 'thumbs'), 'size')

            return {
                // WARNING! These are mutable to avoid triggering state change events.
                //          For internal usage only (inside `compose`d HOCs).
                mutableTimersIds: thumbsCount === 0 ? null : {
                    timeout: null,
                    interval: null,
                },

                thumbsCount,
            }
        }),
        withState('currentThumb', 'setCurrentThumb', null),
        withState('thumbsArePreloaded', 'setThumbsArePreloaded', false),
        withHandlers({
            progress: props => () => {
                const
                    currentThumb = g(props, 'currentThumb')

                props.setCurrentThumb(
                    g(props, 'thumbsCount') - 1 > currentThumb ? currentThumb + 1 : 0
                )
            },

            stopProgress: props => () => {
                clearTimeout(g(props, 'mutableTimersIds', 'timeout'))
                clearInterval(g(props, 'mutableTimersIds', 'interval'))
                props.setCurrentThumb(null)
            },
        }),
        withHandlers({
            mouseLeaveHandler: props => () => {
                if (g(props, 'thumbsCount') === 1)
                    return

                props.stopProgress()
            },

            mouseEnterHandler: props => () => {
                if (g(props, 'thumbsCount') === 1)
                    return

                // preloading images
                if ( ! g(props, 'thumbsArePreloaded')) {
                    ig(props.x, 'thumbs')
                        .map(thumb => set(
                            new Image(),
                            'src',
                            replace(ig(props.x, 'thumbMask'), '{num}', thumb)
                        ))
                        .toArray()

                    props.setThumbsArePreloaded(true)
                }

                // reset old timers in case they for some reason exists
                clearTimeout(g(props, 'mutableTimersIds', 'timeout'))
                clearInterval(g(props, 'mutableTimersIds', 'interval'))

                g(props, 'mutableTimersIds').timeout = setTimeout(() => {
                    props.setCurrentThumb(0)
                    g(props, 'mutableTimersIds').interval = setInterval(g(props, 'progress'), 500)
                }, 1000)
            },
        }),
        lifecycle({
            componentWillUnmount() {
                if (g(this, 'props', 'thumbsCount') === 1)
                    return

                this.props.stopProgress()
            },
        }),
        withPropsOnChange(['x', 'currentThumb'], props => {
            const
                currentThumb = g(props, 'currentThumb')

            return {
                videoPreviewStyle: Object.freeze({
                    backgroundImage: `url(${
                        currentThumb === null
                            ? ig(props.x, 'thumb')
                            : ig(props.x, 'thumbMask')
                                .replace('{num}', ig(props.x, 'thumbs', currentThumb))
                    })`,
                }),
            }
        }),
        onlyUpdateForKeys(['cb', 'x', 'isThisVideoFavorite', 'videoPreviewStyle'])
    )(({
        classes, x, cb, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, isThisVideoFavorite,
        getSearchLink, getVideoLink,
        videoPreviewStyle, mouseEnterHandler, mouseLeaveHandler, thumbsCount,
    }) => <VideoPreview
        onMouseEnter={g(mouseEnterHandler, [])}
        onMouseLeave={g(mouseLeaveHandler, [])}
        style={videoPreviewStyle}
        hasOnlyOneThumb={thumbsCount === 1}
    >
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
    </VideoPreview>),

    VideoItem = ({
        classes, x, cb, getVideoLink, getSearchLink, isSSR, addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler, isThisVideoFavorite,
    }) => <Wrapper>

        {renderLink(x, getVideoLink, <VideoPreviewRender
            classes={classes}
            x={x}
            cb={cb}
            isSSR={isSSR}
            addVideoToFavoriteHandler={addVideoToFavoriteHandler}
            removeVideoFromFavoriteHandler={removeVideoFromFavoriteHandler}
            isThisVideoFavorite={isThisVideoFavorite}
            getSearchLink={getSearchLink}
            getVideoLink={getVideoLink}
        />)}

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
        isThisVideoFavorite: PropTypes.bool,
        favoriteVideoList: ImmutablePropTypes.listOf(PropTypes.number),

        addVideoToFavoriteHandler: PropTypes.func,
        removeVideoFromFavoriteHandler: PropTypes.func,
        getVideoLink: PropTypes.func,
        getSearchLink: PropTypes.func,
    })
)(VideoItem)
