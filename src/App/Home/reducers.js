import {fromJS, List} from 'immutable'

import {
    plainProvedGet as g,
    provedHandleActions,
} from '../helpers'

import {
    PageTextRecord,
    defaultOrientationCode,
} from '../models'

import {stateModel} from './models'
import actions from './actions'

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            pageText: PageTextRecord(),
            nichesList: List(),
            pornstarsList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
            nichesList: List(fromJS(g(payload, 'data', 'nichesList'))),
            pornstarsList: List(fromJS(g(payload, 'data', 'pornstarsList'))),
        }),
        [g(actions, 'loadPageFailure')]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageText: PageTextRecord(),
            nichesList: List(),
            pornstarsList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastOrientationCode: defaultOrientationCode,
        pageText: PageTextRecord(),
        nichesList: [],
        pornstarsList: []
    }))
