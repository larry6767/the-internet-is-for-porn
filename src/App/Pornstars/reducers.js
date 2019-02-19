import {combineReducers} from 'redux-immutable'
import {fromJS, List, Map} from 'immutable'

import {provedHandleActions, plainProvedGet as g} from '../helpers'
import {model} from './models'
import actions from './actions'
import pornstarReducer from './Pornstar/reducers'

export default combineReducers({
    pornstar: pornstarReducer,

    all: provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            modelsList: List(),
            pageText: Map(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),
            pageText: Map(g(payload, 'data', 'pageText')),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            modelsList: List(),
            pageText: Map(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastPageRequestParams: null,
        modelsList: [],
        pageText: {},
    }))
})
