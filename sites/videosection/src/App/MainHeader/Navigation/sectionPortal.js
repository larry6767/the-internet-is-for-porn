import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'

import {plainProvedGet as g, setPropTypes, PropTypes} from '../../helpers'
import actions from './actions'

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
