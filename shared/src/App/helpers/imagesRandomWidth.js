import {compose, withPropsOnChange, onlyUpdateForKeys} from 'recompose'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    ImmutablePropTypes,
    getRandomWidthList,
} from 'src/App/helpers'

// this HOC getting 'randomWidthListSize', 'randomWidthList', 'setRandomWidthList' from props,
// so your wrapped component should provide these props:
// compose(
//     connect(
//         state => ({
//             randomWidthList: ig(state, 'app', 'home', 'randomWidthList'),
//         }),
//         {
//             setRandomWidthList: g(actions, 'setRandomWidthList'),
//         }
//     ),
//     withPropsOnChange(['data'], {
//         randomWidthListSize: g(ig(props.data, 'nichesListWithThumb'), 'size')),
//     }),
//     imagesRandomWidth,
// )
// we can't get 'setRandomWidthList' inside this HOC because we need specific actions for each page
// we can't get 'randomWidthList', because 'currentSections' becomes available after page loads,
// we can't get 'randomWidthListSize', because this HOC is used by the plugs and for each page
// we have different key names (for example: 'nichesListWithThumb', 'videoList', etc)
export default compose(
    onlyUpdateForKeys(['randomWidthListSize', 'randomWidthList']),
    withPropsOnChange(['randomWidthListSize', 'randomWidthList'], props => {
        if ( ! g(props, 'randomWidthListSize'))
            return { styledBounds: null }

        const // getting without 'g' because we don't have 'data' in plugs
            isLoaded = props.data ? ig(props.data, 'isLoaded') : null

        if (
            g(props, 'randomWidthList') &&
            g(props, 'randomWidthList', 'size') === g(props, 'randomWidthListSize')
        )
            return {
                styledBounds: g(props, 'randomWidthList').map(x => Object.freeze({
                    width: `${x}px`
                })),
            }

        const
            randomWidthList = getRandomWidthList(
                g(props, 'randomWidthListSize'),
                g(props, 'randomWidthList'),
            )

        if ( ! isLoaded)
            props.setRandomWidthList({randomWidthList})

        return {
            styledBounds: randomWidthList.map(x => Object.freeze({width: `${x}px`})),
        }
    }),

    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        randomWidthListSize: PropTypes.number,
        randomWidthList: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.number)),
        styledBounds: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.exact({
            width: PropTypes.string,
        }))),
        setRandomWidthList: PropTypes.func,
    })
)
