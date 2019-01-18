import {identity} from 'lodash'
import {setPropTypes} from 'recompose'

// A wrapper around `setPropTypes` from `recompose` which alarms when you constructing prop types in
// production mode.
export default propTypes => {
    if (process.env.NODE_ENV === 'production') {
        if (propTypes !== null)
            console.warn(
                '`propTypes` is not `null` in production mode, ' +
                'try to avoid constructing prop types in production at all, ' +
                "add `process.env.NODE_ENV === 'production' ? null : {...}` condition " +
                '(keep this bare condition simple so bundler could easily detect ' +
                'and remove this code from production bundle at all)'
            )

        return identity
    } else {
        return setPropTypes(propTypes)
    }
}
