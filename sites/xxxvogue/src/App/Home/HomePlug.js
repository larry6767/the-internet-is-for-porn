import {range} from 'lodash'
import React from 'react'
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

import {refModel} from 'src/App/models'
import {NichesList, NichePlug, NicheImagePlug, TypographyPlug} from 'src/App/Home/assets'

const
    numberOfItems = 12,

    HomePlug = props => <NichesList ref={g(props, 'setListRef')}>
        { ! g(props, 'listRef') ? null : range(0, numberOfItems).map(x => <NichePlug
            key={`${x}-NichePlug`}
            style={ig(props.styledBounds, x)}
        >
            <NicheImagePlug/>
            <TypographyPlug/>
        </NichePlug>)}
    </NichesList>

export default compose(
    withProps({
        numberOfItems
    }),
    imagesRandomWidth,
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        numberOfItems: PropTypes.number,
        listRef: refModel,
        styledBounds: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.exact({
            width: PropTypes.string,
        }))),
    })
)(HomePlug)
