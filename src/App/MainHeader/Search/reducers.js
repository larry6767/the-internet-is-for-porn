// TODO FIXME: Now it isn't used
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

import {getSuggestions} from './helpers'
import {plainProvedGet as g, immutableProvedGet as ig} from '../../helpers'
import actions from './actions'

export default combineReducers({

    input: handleActions({
        // [g(actions, 'suggestionsFetchRequest')]: (state, action) => {
        //     return state.set('suggestions', getSuggestions(action.payload.value))
        // },
        [g(actions, 'suggestionsClearRequest')]: state => state.set('suggestions', []),
        [g(actions, 'toggleChange')]: (state, action) => state.set('currentValue', action.payload)
    }, fromJS({suggestions: [], currentValue: ''}))
})
