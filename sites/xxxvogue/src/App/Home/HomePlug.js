import {range} from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {compose, withProps} from 'recompose'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    imagesRandomWidth,
    setPropTypes,
    PropTypes,
    ImmutablePropTypes,
} from 'src/App/helpers'

import {NichesList, NichePlug, NicheImagePlug, TypographyPlug} from 'src/App/Home/assets'
import actions from 'src/App/Home/actions'

const
    itemsQuantity = 12,

    HomePlug = props => <NichesList>
        { ! g(props, 'styledBounds') ? null : range(0, itemsQuantity).map(x => <NichePlug
            key={`${x}-NichePlug`}
            style={ig(props.styledBounds, `${x}`)}
        >
            <NicheImagePlug/>
            <TypographyPlug/>
        </NichePlug>)}
    </NichesList>

export default compose(
    connect(
        state => ({
            randomWidthList: ig(state, 'app', 'home', 'randomWidthList'),
        }),
        {
            setRandomWidthList: g(actions, 'setRandomWidthList'),
        }
    ),
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
        setRandomWidthList: PropTypes.func,
    })
)(HomePlug)
