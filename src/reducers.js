import {combineReducers} from 'redux-immutable'
import appReducer from './App/reducers'

export default combineReducers({
	app: appReducer
})
