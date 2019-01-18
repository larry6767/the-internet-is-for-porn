import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'

import {
    PropTypes,
    ImmutablePropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../helpers'

import actions from './actions'
import pornstarReducer from './Pornstar/reducers'

const
    allStateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,
            pornstarList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
                id: PropTypes.number,
                name: PropTypes.string,
                subPage: PropTypes.string,
                itemsCount: PropTypes.number,
                thumb: PropTypes.string,
                letter: PropTypes.string,
            })),
        })

export default combineReducers({
    pornstar: pornstarReducer,

    all: provedHandleActions(allStateModel, {
        [g(actions, 'loadPageRequest')]: state => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            pornstarList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pornstarList: List(fromJS(g(payload, 'data'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pornstarList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        pornstarList: [],
    }))
})
