import {range} from 'lodash'
import React from 'react'
import {compose} from 'recompose'

// local libs
import {plainProvedGet as g, imagesRandomWidth, setPropTypes, PropTypes} from 'src/App/helpers'
import {refModel} from 'src/App/models'
import {NichesList, NichePlug, NicheImagePlug, TypographyPlug} from 'src/App/Home/assets'

const
    numberOfItems = 12,

    HomePlug = props => <NichesList ref={g(props, 'setListRef')}>
        {g(props, 'listRef') === null ? null : range(0, numberOfItems).map(x => <NichePlug
            key={`${x}-NichePlug`}
            style={g(props, 'styledBounds')[x]}
        >
            <NicheImagePlug/>
            <TypographyPlug/>
        </NichePlug>)}
    </NichesList>

export default compose(
    imagesRandomWidth({
        numberOfItems
    }),
    setPropTypes({
        listRef: refModel,
        styledBounds: PropTypes.nullable(PropTypes.arrayOf(PropTypes.exact({
            width: PropTypes.string,
        }))),
    })
)(HomePlug)
