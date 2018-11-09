import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {loadPageRequest, loadPageSuccess, loadPageFailure} from './actions'

export default
    handleActions({
        [loadPageRequest]: (state) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            nichesList: List(),
        }),
        [loadPageSuccess]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            nichesList: fromJS(payload),
        }),
        [loadPageFailure]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            nichesList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        nichesList: [
            /*
              {
                id: 0,
                name: '',
                sub_url: '',
                items_count: 0,
              }
            */
        ]
    }))
