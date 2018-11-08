import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {resize} from './actions'
import {fromJS} from 'immutable'
import {getCurrentBreakpoint} from './helpers'
import mainHeaderReducer from './MainHeader/reducers'
import nichesReducer from './AllNiches/reducers'
// import videoListReducer from './VideoList/reducers'

export default combineReducers({
	mainHeader: mainHeaderReducer,
	niches: nichesReducer,
	// videoList: videoListReducer,

	// App UI state reducer
	ui: handleActions({
		[resize]: (state, action) => state.set('currentBreakpoint', getCurrentBreakpoint(action.paylod))
	}, fromJS({currentBreakpoint: getCurrentBreakpoint(), contentMinHeight: ''}))
})
