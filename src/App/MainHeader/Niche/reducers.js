import {handleActions} from 'redux-actions'
import {toggleNiche} from './actions'
import {fromJS} from 'immutable'
import {niches} from './fixtures'

export default handleActions({
    [toggleNiche]: (state, action) => {
        const event = action.payload
        return state.set('currentNiche', event.target.value || event.target.dataset.value)}
}, fromJS({currentNiche: Object.keys(niches)[0]}))
