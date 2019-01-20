import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../helpers'

import {orientationCodes, defaultOrientationCode} from '../models'
import {nicheItemModel} from './models'
import {immutablePageTextModel, PageTextRecord} from '../models'
import actions from './actions'
import nicheReducer from './Niche/reducers'

const
    allStateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastOrientationCode: PropTypes.oneOf(orientationCodes),
        nichesList: ImmutablePropTypes.listOf(nicheItemModel),
        pageText: immutablePageTextModel,
    })

export default combineReducers({
    niche: nicheReducer,

    all: provedHandleActions(allStateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            nichesList: List(),
            pageText: PageTextRecord(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            nichesList: List(fromJS(g(payload, 'data', 'tagList'))),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
        }),
        [g(actions, 'loadPageFailure')]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            nichesList: List(),
            pageText: PageTextRecord(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastOrientationCode: defaultOrientationCode,
        nichesList: [],
        pageText: PageTextRecord(),
    }))
})
