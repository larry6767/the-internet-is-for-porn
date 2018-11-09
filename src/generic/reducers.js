import {combineReducers} from 'redux-immutable'
import errorMessageReducer from './ErrorMessage/reducers'

export default combineReducers({
    errorMessage: errorMessageReducer,
})
