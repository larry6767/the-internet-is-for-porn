import ig from 'src/App/helpers/immutable/provedGet'
import PropTypes from 'src/App/helpers/propTypes'
import ImmutablePropTypes from 'src/App/helpers/propTypes/immutable'
import {assertPropTypes} from 'src/App/helpers/propTypes/check'

// WARNING! Be careful! Avoid recursive dependencies!
import {pageRequestParamsModel} from 'src/App/models'

const
    dataModelProps = process.env.NODE_ENV === 'production' ? null : Object.freeze({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
    }),

    // Could be `Map` from store of some component's filtering `Record`,
    // only `.getIn` method is required for compatibility.
    dataModel = process.env.NODE_ENV === 'production' ? null : PropTypes.oneOfType([
        ImmutablePropTypes.shape(dataModelProps),
        ImmutablePropTypes.recordOf(dataModelProps),
    ])

export default (data, pageRequestParams) => {
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(dataModel, data, 'doesItHaveToBeReloaded', 'data')

        assertPropTypes(
            pageRequestParamsModel,
            pageRequestParams,
            'doesItHaveToBeReloaded',
            'pageRequestParams'
        )
    }

    const
        lastPageRequestParams = ig(data, 'lastPageRequestParams')

    return !(
        ig(data, 'isLoading') ||
        (
            (ig(data, 'isLoaded') || ig(data, 'isFailed')) &&
            pageRequestParams.equals(lastPageRequestParams)
        )
    )
}
