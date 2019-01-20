import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'

import {
    provedHandleActions,
    plainProvedGet as g,
} from '../helpers'

import {
    PageTextRecord,
    defaultOrientationCode,
} from '../models'

import {stateModel} from './models'
import actions from './actions'
import pornstarReducer from './Pornstar/reducers'

export default combineReducers({
    pornstar: pornstarReducer,

    all: provedHandleActions(stateModel, {
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
