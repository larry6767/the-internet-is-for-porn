import {handleActions} from 'redux-actions'
import {fromJS, List, Map} from 'immutable'
import actions from './actions'

export default
    handleActions({
        [actions.loadPageRequest]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastSubPage: payload,
            pageUrl: '',
            pageNumber: 1,
            pageText: Map(),
            pagesCount: 1,
            tagList: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: '',
            archiveFilms: fromJS(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data, subPage}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastSubPage: subPage,
            pageUrl: data.pageUrl,
            pageNumber: data.pageNumber,
            pageText: Map(fromJS(data.pageText)),
            pagesCount: data.pagesCount,
            tagList: List(fromJS(data.tagList)),
            tagArchiveList: List(fromJS(data.tagArchiveList)),
            sortList: List(fromJS(data.sortList)),
            currentSort: data.currentSort,
            archiveFilms: fromJS(data.archiveFilms),
        }),
        [actions.loadPageFailure]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageUrl: '',
            pageNumber: 1,
            pageText: Map(),
            pagesCount: 1,
            tagList: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: '',
            archiveFilms: fromJS(),
        }),
        [actions.setNewSort]: (state, {payload}) => state.set('currentSort', payload.newSortValue),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastSubPage: '',
        pageUrl: '',
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
        tagList: [
            /*
            {
                id: 0,
                name: '',
                subPage: '',
                itemsCount: 0,
            }
            */
        ],
        tagArchiveList: [
            /*
            {
                archiveDate: 0,
                year: 0,
                month: '',
                itemsCount: 0,
                url: '',
            }
            */
        ],
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
        archiveFilms: {
            /*
            {
                active: false,
                url: '',
            }
            */
        }
    }))
