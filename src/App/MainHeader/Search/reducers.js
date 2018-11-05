import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {suggestionsFetchRequest, suggestionsClearRequest, toggleChange} from './actions'
import {fromJS} from 'immutable'
import {getSuggestions} from './helpers'

export default combineReducers({

    input: handleActions({
        [suggestionsFetchRequest]: (state, action) => {
            console.log('---payload: ', action.payload)
            return state.set('suggestions', getSuggestions(action.payload.value))
        },
        [suggestionsClearRequest]: state => state.set('suggestions', []),
        [toggleChange]: (state, action) => state.set('currentValue', action.payload)
    }, fromJS({suggestions: [], currentValue: ''}))
})
