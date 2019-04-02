import React from 'react'
import {connect} from 'react-redux'
import {compose, withHandlers, onlyUpdateForKeys, withPropsOnChange} from 'recompose'

// local libs
import {
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
    breakpoints,
    imagesRandomWidth,
} from 'src/App/helpers'

import {routerContextModel} from 'src/App/models'
import {immutableVideoItemModel} from 'src/generic/VideoItem/models'
import routerGetters from 'src/App/routerGetters'
import VideoItem from 'src/generic/VideoItem'
import {List} from 'src/generic/VideoList/assets'
import nicheActions from 'src/App/Niche/actions'
import appActions from 'src/App/actions'

const
    VideoList = props => <List>
        { ! g(props, 'styledBounds') ? null : g(props, 'videoList').map((x, idx) => <VideoItem
            style={ig(props.styledBounds, `${idx}`)}
            key={ig(x, 'id')}
            x={x}
            cb={g(props, 'cb')}
            isSSR={g(props, 'isSSR')}
            favoriteVideoList={g(props, 'favoriteVideoList')}
            addVideoToFavoriteHandler={g(props, 'addVideoToFavoriteHandler')}
            removeVideoFromFavoriteHandler={g(props, 'removeVideoFromFavoriteHandler')}
            getVideoLink={g(props, 'getVideoLink')}
            getSearchLink={g(props, 'getSearchLink')}
        />)}
    </List>

export default compose(
    connect(
        state => ({
            cb: state.getIn(['app', 'ui', 'currentBreakpoint']),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            favoriteVideoList: ig(state, 'app', 'ui', 'favoriteVideoList'),
            randomWidthList: ig(state, 'app', 'niche', 'randomWidthList'),
        }),
        {
            addVideoToFavorite: g(appActions, 'addVideoToFavorite'),
            removeVideoFromFavorite: g(appActions, 'removeVideoFromFavorite'),
            setRandomWidthListForNiche: g(nicheActions, 'setRandomWidthList'),
        }
    ),
    onlyUpdateForKeys(['cb', 'favoriteVideoList', 'videoList']),
    withHandlers({
        setRandomWidthList: props => x => {
            if (g(props, 'videoListRandomWidthForPage') === 'niche')
                props.setRandomWidthListForNiche(x)
        },

        addVideoToFavoriteHandler: props => event => {
            event.preventDefault()

            const
                id = Number(g(event.currentTarget.getAttribute('data-favorite-video-id'), [])),
                x = props.videoList.find(x => ig(x, 'id') === id)

            props.addVideoToFavorite(x)
        },
        removeVideoFromFavoriteHandler: props => event => {
            event.preventDefault()

            const
                id = Number(g(event.currentTarget.getAttribute('data-favorite-video-id'), [])),
                x = props.videoList.find(x => ig(x, 'id') === id)

            props.removeVideoFromFavorite(ig(x, 'id'))
        },
        getVideoLink: props => x => routerGetters.video.link(
            g(props, 'routerContext'),
            ig(x, 'videoPageRef'),
            ig(x, 'title')
        ),

        getSearchLink: props => x => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            {searchQuery: x},
            ['searchQuery'],
        ),
    }),
    withPropsOnChange(['data'], props => ({
        randomWidthListSize: g(props, 'videoList', 'size'),
    })),
    imagesRandomWidth,
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        cb: PropTypes.oneOf(breakpoints),
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
        favoriteVideoList: ImmutablePropTypes.listOf(PropTypes.number),
        videoListRandomWidthForPage: PropTypes.string,

        addVideoToFavorite: PropTypes.func,
        addVideoToFavoriteHandler: PropTypes.func,
        removeVideoFromFavorite: PropTypes.func,
        removeVideoFromFavoriteHandler: PropTypes.func,
        getVideoLink: PropTypes.func,
        getSearchLink: PropTypes.func,

        setRandomWidthList: PropTypes.func,
        setRandomWidthListForNiche: PropTypes.func,
    })
)(VideoList)
