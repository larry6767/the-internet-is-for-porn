import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'

// local libs
import {plainProvedGet as g, setPropTypes, PropTypes} from 'src/App/helpers'
import actions from 'src/App/MainHeader/Navigation/actions'

// Helper HOC
export default compose(
    connect(null, {setCurrentSection: g(actions, 'setCurrentSection')}),
    withHandlers({navigate: props => x => props.setCurrentSection(x)}),
    lifecycle({
        componentDidMount() {
            if (this.props.hasOwnProperty('currentSection'))
                this.props.navigate(g(this, 'props', 'currentSection'))
        },

        componentWillUnmount() {
            if (this.props.hasOwnProperty('currentSection'))
                this.props.navigate(null)
        },
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        currentSection: PropTypes.string.isOptional, // router may provide this prop
    })
)
