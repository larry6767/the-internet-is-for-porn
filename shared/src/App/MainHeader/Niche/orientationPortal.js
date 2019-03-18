import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'

// local libs
import {orientationCodes} from 'src/App/models'
import {plainProvedGet as g, setPropTypes, PropTypes} from 'src/App/helpers'
import actions from 'src/App/MainHeader/Niche/actions'

// Helper HOC
export default compose(
    connect(null, {setOrientation: g(actions, 'setOrientation')}),
    withHandlers({orient: props => x => props.setOrientation(x)}),
    lifecycle({
        componentDidMount() {
            if (this.props.hasOwnProperty('orientationCode'))
                this.props.orient(g(this, 'props', 'orientationCode'))
        },
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        orientationCode: PropTypes.oneOf(orientationCodes).isOptional,
    })
)
