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
        }),
        [actions.loadPageSuccess]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            tagArchiveList: fromJS(payload),
        }),
        [actions.loadPageFailure]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            tagArchiveList: List(),
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
        ]
    }))
