import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../helpers'

import {
    immutablePageTextModel,
    PageTextRecord,
    immutableModelsListModel,
    orientationCodes,
    defaultOrientationCode,
} from '../models'

import actions from './actions'
import pornstarReducer from './Pornstar/reducers'

const
    allStateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,
            lastOrientationCode: PropTypes.oneOf(orientationCodes),
            pageText: immutablePageTextModel,
            modelsList: immutableModelsListModel,
        })

export default combineReducers({
    pornstar: pornstarReducer,

    all: provedHandleActions(allStateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            modelsList: List(),
            pageText: PageTextRecord(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            modelsList: List(),
            pageText: PageTextRecord(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastOrientationCode: defaultOrientationCode,
        modelsList: [],
        pageText: PageTextRecord(),
    }))
})
