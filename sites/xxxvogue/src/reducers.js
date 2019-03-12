import {combineReducers} from 'redux-immutable'
import appReducer from './App/reducers'
import genericReducer from './generic/reducers'
import {reducer as formReducer} from 'redux-form/immutable'

export default patch => combineReducers(patch({
    app: appReducer,
    generic: genericReducer,
    form: formReducer,
}))
