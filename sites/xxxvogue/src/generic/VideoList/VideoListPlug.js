import {range} from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {compose, withProps, withHandlers} from 'recompose'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    imagesRandomWidth,
    setPropTypes,
    PropTypes,
    ImmutablePropTypes,
} from 'src/App/helpers'

import {List} from 'src/generic/VideoList/assets'
import VideoItemPlug from 'src/generic/VideoItem/VideoItemPlug'
import nicheActions from 'src/App/Niche/actions'
import pornstarActions from 'src/App/Pornstar/actions'
import findVideosActions from 'src/App/FindVideos/actions'
import favoriteActions from 'src/App/Favorite/actions'
import {NICHE, PORNSTAR, FIND_VIDEOS, FAVORITE} from 'src/App/constants'

const
    itemsQuantity = 48,

    VideoListPlug = props => <List>
        { ! g(props, 'styledBounds') ? null : range(0, itemsQuantity).map(x => <VideoItemPlug
            key={`${x}-VideoItemPlug`}
            style={ig(props.styledBounds, `${x}`)}
        />)}
    </List>

export default compose(
    connect(
        state => ({
            randomWidthList: ig(state, 'app', 'niche', 'randomWidthList'),
        }),
        {
            setRandomWidthListForNiche: g(nicheActions, 'setRandomWidthList'),
            setRandomWidthListForPornstar: g(pornstarActions, 'setRandomWidthList'),
            setRandomWidthListForFindVideos: g(findVideosActions, 'setRandomWidthList'),
            setRandomWidthListForFavorite: g(favoriteActions, 'setRandomWidthList'),
        }
    ),
    withHandlers({
        setRandomWidthList: props => x => {
            switch (g(props, 'videoListRandomWidthForPage')) {
                case NICHE:
                    props.setRandomWidthListForNiche(x)
                    break
                case PORNSTAR:
                    props.setRandomWidthListForPornstar(x)
                    break
                case FIND_VIDEOS:
                    props.setRandomWidthListForFindVideos(x)
                    break
                case FAVORITE:
                    props.setRandomWidthListForFavorite(x)
                    break
                default:
                    break
            }
        },
    }),
    withProps({
        randomWidthListSize: itemsQuantity,
    }),
    imagesRandomWidth,
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        randomWidthList: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.number)),
        randomWidthListSize: PropTypes.number,
        styledBounds: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.exact({
            width: PropTypes.string,
        }))),
        videoListRandomWidthForPage: PropTypes.string,

        setRandomWidthListForNiche: PropTypes.func,
        setRandomWidthList: PropTypes.func,
    })
)(VideoListPlug)
