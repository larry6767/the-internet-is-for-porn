import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import actions from './actions'

export default
    handleActions({
        [actions.loadPageRequest]: (state) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            tagArchiveList: List(),
            pageUrl: '',
            pageNumber: null,
            pageText: List(),
            pagesCount: null,
        }),
        [actions.loadPageSuccess]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            tagArchiveList: fromJS(payload.tagArchiveList),
            pageUrl: payload.pageUrl,
            pageNumber: payload.pageNumber,
            pageText: fromJS(payload.pageText),
            pagesCount: payload.pagesCount,
        }),
        [actions.loadPageFailure]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            tagArchiveList: List(),
            pageUrl: '',
            pageNumber: null,
            pageText: List(),
            pagesCount: null,
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
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
        pageUrl: '',
        pageNumber: null,
        pageText: [],
        pagesCount: null,
    }))
