import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {toggleLanguage} from './actions'
import {fromJS} from 'immutable'
import {languages} from './fixtures'

export default combineReducers({

    // Language UI state reducer
    ui: handleActions({
        [toggleLanguage]: (state, action) => state.set('currentLanguage', action.payload)
    }, fromJS({currentLanguage: Object.keys(languages)[0]}))
})
