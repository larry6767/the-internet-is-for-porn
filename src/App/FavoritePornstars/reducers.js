import {fromJS, List, Map} from 'immutable'

import {
    addToList,
    removeFromList,
    plainProvedGet as g,
    provedHandleActions,
} from '../helpers'
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
            modelsList: List(),

            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,

            lastPageRequestParams: g(payload, 'pageRequestParams'),

            pageText: Map(g(payload, 'data', 'pageText')),
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),

            pageNumber: g(payload, 'data', 'pageNumber'),
            pagesCount: g(payload, 'data', 'pagesCount'),
            itemsCount: g(payload, 'data', 'itemsCount'),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,

            pageText: Map(),
            modelsList: List(),

            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
        }),
        [g(actions, 'addToList')]: (state, action) =>
            addToList(state, 'modelsList', g(action, 'payload')),
        [g(actions, 'removeFromList')]: (state, action) =>
            removeFromList(state, 'modelsList', g(action, 'payload')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        lastPageRequestParams: null,

        pageText: {},
        modelsList: [],

        pageNumber: 1,
        pagesCount: 1,
        itemsCount: 0,
    }))
