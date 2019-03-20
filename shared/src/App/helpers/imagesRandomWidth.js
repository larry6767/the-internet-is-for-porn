import {connect} from 'react-redux'
import {compose, withState, withPropsOnChange, onlyUpdateForKeys} from 'recompose'

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
    ImmutablePropTypes,
} from 'src/App/helpers'

import {refModel} from 'src/App/models'
import appActions from 'src/App/actions'

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            cw: ig(state, 'app', 'ui', 'currentWidth'),
            randomWidthList: ig(state, 'app', 'ui', 'randomWidthList')
        }),
        {
            setRandomWidthList: g(appActions, 'setRandomWidthList')
        }
    ),

    withState('listRef', 'setListRef', null),

    onlyUpdateForKeys(['numberOfItems', 'listRef', 'cw']),

    withPropsOnChange(['numberOfItems', 'listRef', 'cw'], props => {
        if ( ! g(props, 'listRef') && ! g(props, 'isSSR'))
            return { styledBounds: null }

        const // getting without 'g' because we don't have 'data' in plugs
            isLoaded = props.data ? ig(props.data, 'isLoaded') : null

        if (g(props, 'randomWidthList') && ! isLoaded)
            return {
                styledBounds: g(props, 'randomWidthList').map(x => Object.freeze({width: `${x}px`})),
            }

        const
            isDesktop = ccb(g(props, 'cb'), sm) === 1,
            isXS = ccb(g(props, 'cb'), xs) === 0,
            isXXS = ccb(g(props, 'cb'), xs) === -1,
            isSSR = g(props, 'isSSR'),

            marginOffset = isSSR || isDesktop ? 15 : isXS ? 5 : isXXS ? 0 : 10,
            contentSize = isSSR
                ? 1180 - marginOffset
                : g(props, 'listRef', 'clientWidth') - marginOffset,

            numberOfItemsPerRow = isSSR || isDesktop ? 4 : isXS ? 2 : isXXS ? 1 : 3,
            widthOffset = 30,
            randomWidthList = getRandomWidthList(
                g(props, 'numberOfItems'),
                contentSize,
                numberOfItemsPerRow,
                widthOffset
            )

        if ( ! isLoaded && ! isSSR)
            props.setRandomWidthList(randomWidthList)

        return {
            styledBounds: randomWidthList.map(x => Object.freeze({width: `${x}px`})),
        }
    }),

    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        isSSR: PropTypes.bool,
        cb: PropTypes.oneOf(breakpoints),
        cw: PropTypes.number,
        listRef: refModel,
        styledBounds: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.exact({
            width: PropTypes.string,
        }))),
        setListRef: PropTypes.func,
    })
)
