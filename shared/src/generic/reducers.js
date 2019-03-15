import {combineReducers} from 'redux-immutable'

// local libs
import errorMessageReducer from 'src/generic/ErrorMessage/reducers'

export default combineReducers({
    errorMessage: errorMessageReducer
})
