import {combineReducers} from 'redux-immutable'
import appReducer from './App/reducers'
import genericReducer from './generic/reducers'
import {connectRouter} from 'connected-react-router/immutable'

export default (history) => combineReducers({
    app: appReducer,
    generic: genericReducer,
    router: connectRouter(history)
})
