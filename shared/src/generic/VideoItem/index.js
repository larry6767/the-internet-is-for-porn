import React from 'react'
import {replace, set, sample} from 'lodash'

import {
    compose,
    onlyUpdateForKeys,
    withPropsOnChange,
    withState,
    withHandlers,
    lifecycle,
} from 'recompose'

import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    ImmutablePropTypes,
    PropTypes,
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointXS as xs,
    breakpoints,
    lazyImage,
} from 'src/App/helpers'

import {muiStyles} from 'src/generic/VideoItem/assets/muiStyles'
import {immutableVideoItemModel} from 'src/generic/VideoItem/models'

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
} from 'src/generic/VideoItem/assets'

import {plugColors} from 'src/App/assets/fixtures'

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

    timeoutKey = 'timeout',
    intervalKey = 'interval',

    VideoPreviewRender = compose(
        lazyImage,
        withPropsOnChange(['x'], props => {
            const
                thumbsCount = g(ig(props.x, 'thumbs'), 'size')

            return {
                // WARNING! These are mutable to avoid triggering state change events.
                //          For internal usage only (inside `compose`d HOCs).
                mutableTimersIds: thumbsCount === 0 ? null : {
                    [timeoutKey]: null,
                    [intervalKey]: null,
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
                clearTimeout(g(props, 'mutableTimersIds', timeoutKey))
                clearInterval(g(props, 'mutableTimersIds', intervalKey))
                props.setCurrentThumb(null)
            },
        }),
        withHandlers({
            mouseLeaveHandler: props => () => {
                if ( ! g(props, 'wasVisible') || g(props, 'thumbsCount') === 1)
                    return

                props.stopProgress()
            },

            mouseEnterHandler: props => () => {
                if ( ! g(props, 'wasVisible') || g(props, 'thumbsCount') === 1)
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
                clearTimeout(g(props, 'mutableTimersIds', timeoutKey))
                clearInterval(g(props, 'mutableTimersIds', intervalKey))

                g(props, 'mutableTimersIds')[timeoutKey] = setTimeout(() => {
                    props.setCurrentThumb(0)
                    g(props, 'mutableTimersIds')[intervalKey] =
                        setInterval(g(props, 'progress'), 500)
                }, 1000)
            },
        }),
        lifecycle({
            componentWillUnmount() {
                if ( ! g(this, 'props', 'wasVisible') || g(this, 'props', 'thumbsCount') === 1)
                    return

                this.props.stopProgress()
            },
        }),
        // extending standard previewStyle from lazyImage below
        withPropsOnChange(['x', 'currentThumb', 'wasVisible'], props => {
            if ( ! g(props, 'wasVisible'))
                return {previewStyle: null}

            const
                currentThumb = g(props, 'currentThumb'),
                previewStyle = process.env.NODE_ENV === 'production'
                    ? {
                        backgroundImage: `url(${
                            currentThumb === null
                                ? ig(props.x, 'thumb')
                                : ig(props.x, 'thumbMask')
                                    .replace('{num}', ig(props.x, 'thumbs', currentThumb))
                        })`,
                    }
                    : {backgroundColor: sample(plugColors)}

            return {
                previewStyle: Object.freeze(previewStyle),
            }
        }),
        onlyUpdateForKeys(['cb', 'x', 'isThisVideoFavorite', 'previewStyle'])
    )((props) => <VideoPreview
        onMouseEnter={g(props, 'mouseEnterHandler')}
        onMouseLeave={g(props, 'mouseLeaveHandler')}
        style={g(props, 'previewStyle')}
        hasOnlyOneThumb={g(props, 'thumbsCount') === 1}
        ref={g(props, 'setRef')}
    >
        {g(props, 'isSSR') ? renderLink(g(props, 'x'), g(props, 'getVideoLink')) : null}

        <VideoPreviewBar>
            {g(props, 'isSSR') ? null : ccb(g(props, 'cb'), xs) === 0
                ? renderProviderLink(
                    g(props, 'classes'),
                    g(props, 'x'),
                    g(props, 'getSearchLink'),
                    true
                )
                : <Like>
                    {g(props, 'isThisVideoFavorite')
                        ? <Favorite
                            className={g(props, 'classes', 'favoriteIcon')}
                            data-favorite-video-id={ig(props.x, 'id')}
                            onClick={g(props, 'removeVideoFromFavoriteHandler')}
                        />
                        : <FavoriteBorder
                            className={g(props, 'classes', 'favoriteBorderIcon')}
                            data-favorite-video-id={ig(props.x, 'id')}
                            onClick={g(props, 'addVideoToFavoriteHandler')}
                        />
                    }
                </Like>}

            <Duration>
                <Typography variant="body2" className={g(props, 'classes', 'typography')}>
                    {ig(props.x, 'duration')}
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
                    {ig(x, 'tagsShort').map((x, idx) => <StyledLink
                        key={`${x}-${idx}`}
                        to={getSearchLink(x)}
                    >
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
