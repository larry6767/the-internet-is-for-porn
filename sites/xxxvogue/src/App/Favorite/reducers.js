import {fromJS, List, Map} from 'immutable'

// local libs
import {addToList, removeFromList, plainProvedGet as g, provedHandleActions} from 'src/App/helpers'
import {model} from 'src/App/Favorite/models'
import actions from 'src/App/Favorite/actions'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: null,
            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: Map(g(payload, 'data', 'pageText')),
            pageNumber: g(payload, 'data', 'pageNumber'),
            pagesCount: g(payload, 'data', 'pagesCount'),
            itemsCount: g(payload, 'data', 'itemsCount'),
            videoList: List(fromJS(g(payload, 'data', 'videoList'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageNumber: 1,
            pageText: null,
            pagesCount: 1,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'addToList')]: (state, action) =>
            addToList(state, 'videoList', g(action, 'payload')),
        [g(actions, 'removeFromList')]: (state, action) =>
            removeFromList(state, 'videoList', g(action, 'payload')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastPageRequestParams: null,
        pageText: null,
        pageNumber: 1,
        pagesCount: 1,
        itemsCount: 0,
        videoList: [],
    }))
