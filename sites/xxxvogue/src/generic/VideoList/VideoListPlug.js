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
        }
    ),
    withHandlers({
        setRandomWidthList: props => x => {
            if (g(props, 'videoListRandomWidthForPage') === 'niche')
                props.setRandomWidthListForNiche(x)
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
