import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../helpers'

import {nicheItemModel} from './models'
import actions from './actions'
import nicheReducer from './Niche/reducers'

const
    allStateModel = ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        nichesList: ImmutablePropTypes.listOf(nicheItemModel),
    })

export default combineReducers({
    niche: nicheReducer,

    all: provedHandleActions(allStateModel, {
        [actions.loadPageRequest]: (state) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            nichesList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            nichesList: fromJS(g(payload, 'data')),
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
        nichesList: [],
    }))
})
