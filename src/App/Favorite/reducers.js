import {fromJS, List} from 'immutable'

import {
    addToList,
    removeFromList,
    plainProvedGet as g,
    provedHandleActions,
    ImmutablePropTypes,
    PropTypes,
} from '../helpers'

import {PageTextRecord, immutablePageTextModel, pageRequestParamsModel} from '../models'
import {immutableVideoItemModel} from '../../generic/VideoItem/models'
import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageText: immutablePageTextModel,
        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: PageTextRecord(),
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
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
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
            pageText: PageTextRecord(),
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
        pageText: PageTextRecord(),
        pageNumber: 1,
        pagesCount: 1,
        itemsCount: 0,
        videoList: [],
    }))
