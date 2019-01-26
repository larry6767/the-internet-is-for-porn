import {Record} from 'immutable'

import ig from './immutable/provedGet'
import PropTypes from './propTypes'
import ImmutablePropTypes from './propTypes/immutable'
import {assertPropTypes} from './propTypes/check'

import {
    pageRequestParamsModel,
    PageRequestParamsRecord,
    PageRequestArchiveParamRecord,
} from '../models'

const
    dataModelProps = process.env.NODE_ENV === 'production' ? null : {
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
    },

    dataModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.oneOfType([
            ImmutablePropTypes.recordOf(dataModelProps),
            ImmutablePropTypes.mapOf(dataModelProps),
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

        // Aditional check that it is actually a `Record` (not `Map`).
        assertPropTypes(
            ImmutablePropTypes.record,
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

            pageRequestParams.equals(
                lastPageRequestParams === null
                ? null
                : Record.isRecord(lastPageRequestParams)
                ? lastPageRequestParams
                : PageRequestParamsRecord(lastPageRequestParams).update('archive', x =>
                    x === null ? null : PageRequestArchiveParamRecord(x)
                )
            )
        )
    )
}
