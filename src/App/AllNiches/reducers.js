import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'

import {
    provedHandleActions,
    plainProvedGet as g,
} from '../helpers'

import {defaultOrientationCode, PageTextRecord} from '../models'
import {stateModel} from './models'
import actions from './actions'
import nicheReducer from './Niche/reducers'

export default combineReducers({
    niche: nicheReducer,

    all: provedHandleActions(stateModel, {
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
