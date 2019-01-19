import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'

import {orientationCodes} from '../../models'
import {plainProvedGet as g, setPropTypes, PropTypes} from '../../helpers'
import actions from './actions'

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
