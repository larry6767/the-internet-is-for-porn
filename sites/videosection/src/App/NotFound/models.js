import {ImmutablePropTypes, PropTypes} from 'src/App/helpers'
import {pageRequestParamsModel} from 'src/App/models'
import {immutableVideoItemModel} from 'src/generic/VideoItem/models'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })
