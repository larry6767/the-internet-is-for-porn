import {lifecycle} from 'recompose'

// local libs
import {default as areWeSwitchedOnPage} from 'src/App/helpers/areWeSwitchedOnPage'
import g from 'src/App/helpers/plain/provedGet'
import ig from 'src/App/helpers/immutable/provedGet'

const
    areRefsNotNull = (props, refsKeys) => g(refsKeys, []).every(x => g(props, x) !== null),

    areWeSwitchedOnPageWithRefs = (prevProps, nextProps, refsKeys) => {
        if (
            (
                areWeSwitchedOnPage(prevProps, nextProps) &&
                areRefsNotNull(nextProps, refsKeys)
            ) || (
                ig(g(prevProps, 'data'), 'isLoaded') &&
                !areRefsNotNull(prevProps, refsKeys) &&
                areRefsNotNull(nextProps, refsKeys)
            )
        ) return true
    }

export default (loadPageFlow, setNewPageFlow, refsKeys) => lifecycle({
    componentDidMount() {
        loadPageFlow(this.props)
        if (areWeSwitchedOnPage(null, this.props) && areRefsNotNull(this.props, refsKeys)) {
            setNewPageFlow(this.props)
        }
    },

    componentWillReceiveProps(nextProps) {
        loadPageFlow(nextProps)
        if (areWeSwitchedOnPageWithRefs(this.props, nextProps, refsKeys)) {
            setNewPageFlow(nextProps)
        }
    },
})
