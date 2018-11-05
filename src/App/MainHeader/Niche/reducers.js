import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {toggleNiche} from './actions'
import {fromJS} from 'immutable'

export default combineReducers({

	// Niche UI state reducer
	ui: handleActions({
		[toggleNiche]: (state, action) => {
			const event = action.payload
			return state.set('currentNiche', event.target.value || event.target.dataset.value)}
	}, fromJS({currentNiche: 'Straight'}))
})
