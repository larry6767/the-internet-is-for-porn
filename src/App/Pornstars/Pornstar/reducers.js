import {handleActions} from 'redux-actions'
import {fromJS, List, Record} from 'immutable'

import {plainProvedGet as g, immutableProvedGet as ig} from '../../helpers'
import actions from './actions'

const
    PageTextRecord = Record({
        description: '',
        headerDescription: '',
        headerTitle: null,
        keywords: '',
        listHeader: null,
        listHeaderEmpty: null,
        title: '',
    })

export default
    handleActions({
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
        sortList: [
            /*
            {
                active: false,
                value: '',
                localText: '',
            }
            */
        ],
        currentSort: null,
        itemsCount: 0,
        videoList: [
            /*
            {
                id: 0,
                thumb,
                title: '',
                sponsorId: 0,
                tags: '',
                tagsShort: '',
                favorite: 0,
                duration: 0,
            }
            */
        ],
        modelsList: [
            /*
            {
                id: 0,
                name: '',
                subPage: '',
                itemsCount: 0,
            }
            */
        ],
        modelInfo: [],
        modelThumb: '',
    }))
