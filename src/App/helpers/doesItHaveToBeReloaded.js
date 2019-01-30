import ig from './immutable/provedGet'
import PropTypes from './propTypes'
import ImmutablePropTypes from './propTypes/immutable'
import {assertPropTypes} from './propTypes/check'

import {pageRequestParamsModel} from '../models'

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
        ImmutablePropTypes.mapOf(dataModelProps),
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
