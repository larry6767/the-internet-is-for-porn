import {fromJS, List, Map} from 'immutable'

import {ImmutablePropTypes, PropTypes, provedHandleActions, plainProvedGet as g} from '../helpers'
import {immutableVideoItemModel} from '../../generic/VideoItem/models'
import actions from './actions'

const
    model = ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastSubPageForRequest: PropTypes.string,
        pageNumber: PropTypes.number,
        pageText: ImmutablePropTypes.exact({
            description: PropTypes.string,
            headerDescription: PropTypes.string,
            headerTitle: PropTypes.string,
            keywords: PropTypes.string,
            listHeader: PropTypes.string,
            listHeaderEmpty: PropTypes.string,
            title: PropTypes.string,
            galleryTitle: PropTypes.string.isOptional,
        }),
        pagesCount: PropTypes.number,
        sortList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        })),
        currentSort: PropTypes.string.isOptional, // may be `null`
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    }),

    emptyPageText = fromJS({
        description: '',
        headerDescription: '',
        headerTitle: '',
        keywords: '',
        listHeader: '',
        listHeaderEmpty: '',
        title: '',
        galleryTitle: null,
    })

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastSubPageForRequest: payload,
            pageNumber: 1,
            pageText: emptyPageText,
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
            pageText: Map(fromJS(g(data, 'pageText'))),
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
            pageText: emptyPageText,
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
        pageText: emptyPageText,
        pagesCount: 1,
        sortList: [],
        currentSort: null,
        itemsCount: 0,
        videoList: [],
    }))
