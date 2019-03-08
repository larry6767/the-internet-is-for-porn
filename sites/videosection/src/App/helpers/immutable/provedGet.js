import {isArray} from 'lodash'
import {isImmutable, getIn, get} from 'immutable'

// Safe way to obtain value by path from an immutable Map/List/etc.
// By "safe" I mean it guarantees that value is not `undefined` otherwise it throws exception,
// this function helps to avoid unexpected behavior and crazy bugs which hard to debug.
//
// Usage examples:
//   provedGet(immutableObj, ['foo', 'bar', 5, 'baz'])
//   provedGet(immutableObj, 'foo', 'bar', 5, 'baz')
// Also you could use it to verify that a value isn't an `undefined` like that:
//   provedGet(varName, [])
export default (immutableObj, path, ...restPath) => {
    if (process.env.NODE_ENV === 'production') {

        if (restPath.length > 0) {
            restPath.unshift(path)
            return getIn(immutableObj, restPath)
        } else if (typeof path === 'string')
            return get(immutableObj, path)
        else if (path.length === 0)
            return immutableObj
        else
            return getIn(immutableObj, path)

    } else { // for development

        if (restPath.length > 0)
            path = [path].concat(restPath)
        else if ( ! isArray(path))
            path = [path]

        if ( ! isImmutable(immutableObj))
            throw new Error(
                `Failed to obtain a value by this path: ${JSON.stringify(path)} ` +
                'because provided source object is not an immutable.js structure ' +
                `(type is: ${typeof immutableObj})`
            )

        const result = path.length === 0 ? immutableObj : getIn(immutableObj, path)

        if (result === undefined)
            throw new Error(
                `Failed to obtain a value by this path: ${JSON.stringify(path)} ` +
                `(provided object's available top-level keys: ${JSON.stringify(
                    immutableObj.keySeq ? immutableObj.keySeq().toJS() : null
                )})`
            )
        else
            return result
    }
}
