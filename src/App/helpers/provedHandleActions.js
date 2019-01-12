import {mapValues} from 'lodash'
import {handleActions} from 'redux-actions'

import {assertPropTypes} from './propTypes/check'

// helps to validate store branch with prop types
export default (model, mapping, initialState) => {
    if (process.env.NODE_ENV === 'production') {
        return handleActions(mapping, initialState)
    } else {
        assertPropTypes(model, initialState)

        return handleActions(mapValues(mapping, f => (state, action) => {
            const nextState = f(state, action)
            assertPropTypes(model, nextState)
            return nextState
        }), initialState)
    }
}
