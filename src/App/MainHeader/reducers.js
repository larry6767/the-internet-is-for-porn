import {combineReducers} from 'redux-immutable'
import nicheReducer from './Niche/reducers'
import languageReducer from './Language/reducers'
import HDSwitchReducer from './HDSwitch/reducers'
import navigationReducer from './Navigation/reducers'
import searchReducer from './Search/reducers'
import burgerMenuReducer from './BurgerMenu/reducers'
import {toggleSearch} from './actions'

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

export default combineReducers({
    niche: nicheReducer,
    language: languageReducer,
    HDSwitch: HDSwitchReducer,
    navigation: navigationReducer,
    search: searchReducer,
    burgerMenu: burgerMenuReducer,

    // MainHeader UI state reducer
	ui: handleActions({
		[toggleSearch]: state => state.set('isSearchShown', !state.get('isSearchShown'))
	}, fromJS({isSearchShown: false}))
})
