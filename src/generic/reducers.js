import {combineReducers} from 'redux-immutable'
import errorMessageReducer from './ErrorMessage/reducers'
import videoItemReducer from './VideoItem/reducers'

export default combineReducers({
    errorMessage: errorMessageReducer,
    videoItem: videoItemReducer,
})
