import {combineReducers} from 'redux-immutable'
import appReducer from './App/reducers'
import {connectRouter} from 'connected-react-router/immutable'

export default (history) => combineReducers({
	app: appReducer,
	router: connectRouter(history)
})
