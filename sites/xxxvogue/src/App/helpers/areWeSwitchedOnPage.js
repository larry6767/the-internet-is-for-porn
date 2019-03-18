import g from 'src/App/helpers/plain/provedGet'
import ig from 'src/App/helpers/immutable/provedGet'
import PropTypes from 'src/App/helpers/propTypes'
import ImmutablePropTypes from 'src/App/helpers/propTypes/immutable'
import {assertPropTypes} from 'src/App/helpers/propTypes/check'

const
    dataModelProps = process.env.NODE_ENV === 'production' ? null : Object.freeze({
        isLoaded: PropTypes.bool,
    }),

    propsModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        currentSection: PropTypes.nullable(PropTypes.string),
        data: PropTypes.oneOfType([
            ImmutablePropTypes.recordOf(dataModelProps),
            ImmutablePropTypes.shape(dataModelProps),
        ])
    }),

    optionalPropsModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.nullable(propsModel)

export default (prevProps, nextProps) => {
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(optionalPropsModel, prevProps, 'areWeSwitchedOnPage', 'prevProps')
        assertPropTypes(propsModel, nextProps, 'areWeSwitchedOnPage', 'nextProps')
    }

    if (
        // if we went to new section
        (
            prevProps !== null &&
            g(prevProps, 'currentSection') !== g(nextProps, 'currentSection')
        ) ||
        // if we still on the same section but new data is just loaded
        (prevProps === null && ig(g(nextProps, 'data'), 'isLoaded')) ||
        (
            prevProps !== null &&
            !ig(g(prevProps, 'data'), 'isLoaded') &&
            ig(g(nextProps, 'data'), 'isLoaded')
        )
    )
        return true
    else
        return false
}
