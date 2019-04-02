import {fromJS, List, Map} from 'immutable'

// local libs
import {provedHandleActions, plainProvedGet as g} from '../helpers'
import {model} from 'src/App/FindVideos/models'
import actions from 'src/App/FindVideos/actions'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            orientationSuggestion: null,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageNumber: 1,
            pageText: null,
            pagesCount: 1,
            sortList: List(),
            currentSort: null,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            orientationSuggestion: g(payload, 'data', 'orientationSuggestion'),
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageNumber: g(payload, 'data', 'pageNumber'),
            pageText: Map(g(payload, 'data', 'pageText')),
            pagesCount: g(payload, 'data', 'pagesCount'),
            sortList: List(fromJS(g(payload, 'data', 'sortList'))),
            currentSort: g(payload, 'data', 'currentSort'),
            itemsCount: g(payload, 'data', 'itemsCount'),
            videoList: List(fromJS(g(payload, 'data', 'videoList'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            orientationSuggestion: null,
            pageNumber: 1,
            pageText: null,
            pagesCount: 1,
            sortList: List(),
            currentSort: null,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'setNewSort')]: (state, {payload}) =>
            state.set('currentSort', g(payload, 'newSortValue')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        orientationSuggestion: null,
        lastPageRequestParams: null,
        pageNumber: 1,
        pageText: null,
        pagesCount: 1,
        sortList: [],
        currentSort: null,
        itemsCount: 0,
        videoList: [],
    }))
