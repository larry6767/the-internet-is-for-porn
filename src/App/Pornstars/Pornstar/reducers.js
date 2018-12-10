import {handleActions} from 'redux-actions'
import {fromJS, List, OrderedMap, Map} from 'immutable'
import actions from './actions'

export default
    handleActions({
        [actions.loadPageRequest]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            currentSubPage: '',
            lastSubPageForRequest: payload,
            pageNumber: 1,
            pageText: Map(),
            pagesCount: 1,
            sortList: List(),
            currentSort: '',
            itemsCount: 0,
            videoList: List(),
            modelsList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data, subPageForRequest}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            currentSubPage: data.currentSubPage,
            lastSubPageForRequest: subPageForRequest,
            pageNumber: data.pageNumber,
            pageText: Map(fromJS(data.pageText)),
            pagesCount: data.pagesCount,
            sortList: List(fromJS(data.sortList)),
            currentSort: data.currentSort,
            itemsCount: data.itemsCount,
            videoList: List(fromJS(data.videoList)),
            modelsList: List(fromJS(data.modelsList)),
        }),
        [actions.loadPageFailure]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            currentSubPage: '',
            lastSubPageForRequest: '',
            pageNumber: 1,
            pageText: OrderedMap(),
            pagesCount: 1,
            sortList: List(),
            currentSort: '',
            itemsCount: 0,
            videoList: List(),
            modelsList: List(),
        }),
        [actions.setNewSort]: (state, {payload}) => state.set('currentSort', payload.newSortValue),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        currentSubPage: '',
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: {
            /*
            description: '',
            headerDescription: '',
            headerTitle: '',
            keywords: '',
            listHeader: '',
            listHeaderEmpty: '',
            title: '',
            */
        },
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
        currentSort: '',
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
                urlRegular: '',
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
    }))
