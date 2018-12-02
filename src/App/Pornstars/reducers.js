import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import actions from './actions'
import pornstarReducer from './Pornstar/reducers'

export default combineReducers({
    pornstar: pornstarReducer,

    all: handleActions({
        [actions.loadPageRequest]: (state) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            pornstarsList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pornstarsList: fromJS(data),
        }),
        [actions.loadPageFailure]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pornstarsList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        pornstarsList: [
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
