import {fromJS, List} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
    immutableProvedGet as ig
} from '../../helpers'
import {immutablePageTextModel, PageTextRecord} from '../../models'
import {immutableVideoItemModel} from '../../../generic/VideoItem/models'
import {modelsListModel, modelInfoModel} from '../models'
import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        modelInfoIsOpen: PropTypes.bool,
        currentSubPage: PropTypes.string,
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
        modelsList: ImmutablePropTypes.listOf(modelsListModel),
        modelInfo: ImmutablePropTypes.listOf(modelInfoModel),
        modelThumb: PropTypes.string,
    })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            modelInfoIsOpen: false,
            currentSubPage: '',
            lastSubPageForRequest: payload,
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            sortList: List(),
            currentSort: null,
            itemsCount: 0,
            videoList: List(),
            modelsList: List(),
            modelInfo: List(),
            modelThumb: '',
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            modelInfoIsOpen: false,
            currentSubPage: g(payload, 'data', 'currentSubPage'),
            lastSubPageForRequest: g(payload, 'subPageForRequest'),
            pageNumber: g(payload, 'data', 'pageNumber'),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
            pagesCount: g(payload, 'data', 'pagesCount'),
            sortList: List(fromJS(g(payload, 'data', 'sortList'))),
            currentSort: g(payload, 'data', 'currentSort'),
            itemsCount: g(payload, 'data', 'itemsCount'),
            videoList: List(fromJS(g(payload, 'data', 'videoList'))),
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),
            modelInfo: List(fromJS(g(payload, 'data', 'modelInfo'))),
            modelThumb: g(payload, 'data', 'modelThumb'),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            modelInfoIsOpen: false,
            currentSubPage: '',
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            sortList: List(),
            currentSort: null,
            itemsCount: 0,
            videoList: List(),
            modelsList: List(),
            modelInfo: List(),
            modelThumb: '',
        }),
        [g(actions, 'setNewSort')]: (state, {payload}) =>
            state.set('currentSort', g(payload, 'newSortValue')),
        [g(actions, 'toggleModelInfo')]: state =>
            state.set('modelInfoIsOpen', !ig(state, 'modelInfoIsOpen'))
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        modelInfoIsOpen: false,
        currentSubPage: '',
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: PageTextRecord(),
        pagesCount: 1,
        sortList: [],
        currentSort: null,
        itemsCount: 0,
        videoList: [],
        modelsList: [],
        modelInfo: [],
        modelThumb: '',
    }))
