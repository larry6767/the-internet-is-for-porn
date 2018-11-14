import {combineReducers} from 'redux-immutable'
import appReducer from './App/reducers'
import genericReducer from './generic/reducers'

export default patch => combineReducers(patch({
    app: appReducer,
    generic: genericReducer,
}))
