import {fromJS, Map, List} from 'immutable'

import {provedHandleActions, plainProvedGet as g, immutableProvedGet as ig} from '../../helpers'
import {PageTextRecord} from '../../models'
import {model} from './models'
import actions from './actions'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            modelInfoIsOpen: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            sortList: List(),
            currentSort: null,
            itemsCount: 0,
            videoList: List(),
            modelsList: List(),
            pornstarInfoForTable: Map(),
            pornstarInfoForTableKeysOrder: List(),
            pornstarInfo: null,
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            modelInfoIsOpen: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageNumber: g(payload, 'data', 'pageNumber'),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
            pagesCount: g(payload, 'data', 'pagesCount'),
            sortList: List(fromJS(g(payload, 'data', 'sortList'))),
            currentSort: g(payload, 'data', 'currentSort'),
            itemsCount: g(payload, 'data', 'itemsCount'),
            videoList: List(fromJS(g(payload, 'data', 'videoList'))),
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),
            pornstarInfoForTable: Map(g(payload, 'data', 'pornstarInfoForTable')),
            pornstarInfoForTableKeysOrder: List(g(payload, 'data', 'pornstarInfoForTableKeysOrder')),
            pornstarInfo: Map(fromJS(g(payload, 'data', 'pornstarInfo'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            modelInfoIsOpen: false,
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            sortList: List(),
            currentSort: null,
            itemsCount: 0,
            videoList: List(),
            modelsList: List(),
            pornstarInfoForTable: Map(),
            pornstarInfoForTableKeysOrder: List(),
            pornstarInfo: null,
        }),

        [g(actions, 'setNewSort')]: (state, {payload}) =>
            state.set('currentSort', g(payload, 'newSortValue')),
        [g(actions, 'toggleModelInfo')]: state =>
            state.set('modelInfoIsOpen', !ig(state, 'modelInfoIsOpen')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        modelInfoIsOpen: false,
        lastPageRequestParams: null,
        pageNumber: 1,
        pageText: PageTextRecord(), // TODO FIXME only `Map` or `List` are allowed in store
        pagesCount: 1,
        sortList: [],
        currentSort: null,
        itemsCount: 0,
        videoList: [],
        modelsList: [],

        // key-value map (could have different keys, keys set may vary).
        // it's like a list which have keys as text instead of numeric indexes.
        // any key is optional.
        pornstarInfoForTable: {},
        pornstarInfoForTableKeysOrder: [],

        pornstarInfo: null,
    }))
