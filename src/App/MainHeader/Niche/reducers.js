import {fromJS} from 'immutable'
import {handleActions} from 'redux-actions'

import actions from './actions'
import {niches} from './fixtures'

export default handleActions({
    [actions.toggleNiche]: (state, {payload}) => state.set('currentNiche', payload),
}, fromJS({currentNiche: Object.keys(niches)[0]}))
