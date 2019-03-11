import {ImmutablePropTypes, PropTypes} from '../helpers'

import {pageRequestParamsModel} from '../models'
import {immutableVideoItemModel} from '../../generic/VideoItem/models'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })
