import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../helpers'
import {immutablePageTextModel, PageTextRecord} from '../models'
import {modelsListModel} from './models'
import actions from './actions'
import pornstarReducer from './Pornstar/reducers'

const
    allStateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,
            pageText: immutablePageTextModel,
            modelsList: ImmutablePropTypes.listOf(modelsListModel),
        })

export default combineReducers({
    pornstar: pornstarReducer,

    all: provedHandleActions(allStateModel, {
        [g(actions, 'loadPageRequest')]: state => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            modelsList: List(),
            pageText: PageTextRecord(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            modelsList: List(),
            pageText: PageTextRecord(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        modelsList: [],
        pageText: PageTextRecord(),
    }))
})
