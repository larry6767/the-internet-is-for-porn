import {range} from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {compose, withState, withPropsOnChange} from 'recompose'

// local libs
import {
    getRandomWidthList,
    plainProvedGet as g,
    immutableProvedGet as ig,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpointXS as xs,
    breakpoints,
    setPropTypes,
    PropTypes,
} from 'src/App/helpers'

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
    connect(state => ({
        cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
        cw: ig(state, 'app', 'ui', 'currentWidth'),
    })),
    withState('listRef', 'setListRef', null),
    withPropsOnChange(['listRef', 'cw'], props => {
        if (g(props, 'listRef') !== null) {
            const
                isDesktop = ccb(g(props, 'cb'), sm) === 1,
                isXS = ccb(g(props, 'cb'), xs) === 0,
                isXXS = ccb(g(props, 'cb'), xs) === -1,
                marginOffset = isDesktop ? 15 : isXS ? 5 : isXXS ? 0 : 10,
                contentSize = g(props, 'listRef', 'clientWidth') - marginOffset,
                numberOfItemsPerRow = isDesktop ? 4 : isXS ? 2 : isXXS ? 1 : 3,
                widthOffset = 30,
                randomWidthList =
                    getRandomWidthList(numberOfItems, contentSize, numberOfItemsPerRow, widthOffset)

            return {
                styledBounds: randomWidthList.map(x => Object.freeze({width: `${x}px`})),
            }
        } else {
            return { styledBounds: null }
        }
    }),
    setPropTypes({
        cb: PropTypes.oneOf(breakpoints),
        cw: PropTypes.number,
        listRef: PropTypes.nullable(PropTypes.instanceOf(
            typeof Element === 'undefined' ? () => {} : Element // plug for SSR
        )),
        styledBounds: PropTypes.nullable(PropTypes.arrayOf(PropTypes.exact({
            width: PropTypes.string,
        }))),
        setListRef: PropTypes.func,
    })
)(HomePlug)
