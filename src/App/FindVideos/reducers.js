import {fromJS, List} from 'immutable'

import {ImmutablePropTypes, PropTypes, provedHandleActions, plainProvedGet as g} from '../helpers'

import {
    immutablePageTextModel,
    PageTextRecord,
} from '../models'

import {immutableVideoItemModel} from '../../generic/VideoItem/models'
import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastSubPageForRequest: PropTypes.string,
        pageNumber: PropTypes.number,
        pageText: immutablePageTextModel,
        pagesCount: PropTypes.number,
        sortList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        })),
        currentSort: PropTypes.nullable(PropTypes.string),
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastSubPageForRequest: payload,
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            sortList: List(),
            currentSort: null,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload: {data, subPageForRequest}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastSubPageForRequest: subPageForRequest,
            pageNumber: data.pageNumber,
            pageText: PageTextRecord(g(data, 'pageText')),
            pagesCount: data.pagesCount,
            sortList: List(fromJS(g(data, 'sortList'))),
            currentSort: g(data, 'currentSort'),
            itemsCount: data.itemsCount,
            videoList: List(fromJS(g(data, 'videoList'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageNumber: 1,
            pageText: PageTextRecord(),
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
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: PageTextRecord(),
        pagesCount: 1,
        sortList: [],
        currentSort: null,
        itemsCount: 0,
        videoList: [],
    }))
