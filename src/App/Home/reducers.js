import {fromJS, List} from 'immutable'

import {plainProvedGet as g, provedHandleActions} from '../helpers'
import {PageTextRecord} from '../models'
import {stateModel} from './models'
import actions from './actions'

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: PageTextRecord(),
            nichesList: List(),
            pornstarsList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
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
        lastPageRequestParams: null,
        pageText: PageTextRecord(),
        nichesList: [],
        pornstarsList: []
    }))
