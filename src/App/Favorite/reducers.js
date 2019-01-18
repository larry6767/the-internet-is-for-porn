import {fromJS, List} from 'immutable'

import {
    addToList,
    removeFromList,
    plainProvedGet as g,
    provedHandleActions,
    ImmutablePropTypes,
    PropTypes,
} from '../helpers'
import {PageTextRecord, immutablePageTextModel} from '../models'
import {immutableVideoItemModel} from '../../generic/VideoItem/models'
import actions from './actions'

const
    stateModel = ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        pageNumber: PropTypes.number,
        pageText: immutablePageTextModel,
        pagesCount: PropTypes.number,
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: state => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pageNumber: g(payload, 'data', 'pageNumber'),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
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
        pageNumber: 1,
        pageText: PageTextRecord(),
        pagesCount: 1,
        itemsCount: 0,
        videoList: [],
    }))
