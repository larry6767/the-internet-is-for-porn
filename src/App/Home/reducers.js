import {fromJS, List, Map} from 'immutable'

import {plainProvedGet as g, provedHandleActions} from '../helpers'
import {model} from './models'
import actions from './actions'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: Map(),
            nichesList: List(),
            pornstarsList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: Map(g(payload, 'data', 'pageText')),
            nichesList: List(fromJS(g(payload, 'data', 'nichesList'))),
            pornstarsList: List(fromJS(g(payload, 'data', 'pornstarsList'))),
        }),
        [g(actions, 'loadPageFailure')]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageText: Map(),
            nichesList: List(),
            pornstarsList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastPageRequestParams: null,
        pageText: {},
        nichesList: [],
        pornstarsList: []
    }))
