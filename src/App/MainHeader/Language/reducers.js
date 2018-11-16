import {handleActions} from 'redux-actions'
import actions from './actions'
import {fromJS} from 'immutable'
import {languages} from './fixtures'

export default handleActions({
    [actions.setNewLanguage]: (state, action) => state.set('currentLanguage', action.payload)
}, fromJS({currentLanguage: Object.keys(languages)[0]}))
