import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import actions from './actions'

export default
    handleActions({
        [actions.loadPageRequest]: (state) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastRoute: '',
            pageUrl: '',
            pageNumber: null,
            pageText: List(),
            pagesCount: null,
            tagList: List(),
            tagArchiveList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastRoute: payload.lastRoute,
            pageUrl: payload.pageUrl,
            pageNumber: payload.pageNumber,
            pageText: fromJS(payload.pageText),
            pagesCount: payload.pagesCount,
            tagList: fromJS(payload.tagList),
            tagArchiveList: fromJS(payload.tagArchiveList),
        }),
        [actions.loadPageFailure]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            lastRoute: '',
            pageUrl: '',
            pageNumber: null,
            pageText: List(),
            pagesCount: null,
            tagList: List(),
            tagArchiveList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastRoute: '',
        pageUrl: '',
        pageNumber: null,
        pageText: [],
        pagesCount: null,
        tagList: [
            /*
              {
                id: 0,
                name: '',
                sub_url: '',
                items_count: 0,
              }
            */
        ],
        tagArchiveList: [
            /*
                {
                    "archive_date": 0,
                    "year": 0,
                    "month": '',
                    "items_count": 0,
                    "url": ''
                }
            */
        ],
    }))
