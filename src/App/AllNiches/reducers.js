import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import actions from './actions'
import nicheReducer from './Niche/reducers'

export default combineReducers({
    niche: nicheReducer,

    all: handleActions({
        [actions.loadPageRequest]: (state) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            nichesList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            nichesList: fromJS(data),
        }),
        [actions.loadPageFailure]: (state) => state.merge({
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
                subPage: '',
                itemsCount: 0,
            }
            */
        ]
    }))
})
