import {mapValues} from 'lodash'
import {handleActions} from 'redux-actions'

// local libs
import {assertPropTypes} from 'src/App/helpers/propTypes/check'

// helps to validate store branch with prop types
export default (model, mapping, initialState) => {
    if (process.env.NODE_ENV === 'production') {
        if (model !== null)
            console.warn(
                '`model` is not `null` in production mode, ' +
                'try to avoid constructing prop types in production at all, ' +
                "add `process.env.NODE_ENV === 'production' ? null : {...}` condition " +
                '(keep this bare condition simple so bundler could easily detect ' +
                'and remove this code from production bundle at all).',
                `Stack trace: ${new Error().stack}`
            )

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
