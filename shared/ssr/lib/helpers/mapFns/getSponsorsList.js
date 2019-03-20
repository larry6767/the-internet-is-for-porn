import {map, omit} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'

const
    sponsorsModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.objectOf(PropTypes.shape({name: PropTypes.string}))

export default (sponsors) => {
    sponsors = omit(sponsors, 'all')
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(sponsorsModel, sponsors, 'getSponsorsList', 'sponsors')
    }

    return map(
        sponsors,
        x => g(x, 'name')
    )
}
