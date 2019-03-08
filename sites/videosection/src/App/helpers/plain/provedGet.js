import {get} from 'lodash'

// Safe way to obtain value by path from an object/array.
// By "safe" I mean it guarantees that value is not `undefined` otherwise it throws exception,
// this function helps to avoid unexpected behavior and crazy bugs which hard to debug.
//
// Usage examples:
//   provedGet(obj, ['foo', 'bar', 5, 'baz'])
//   provedGet(obj, 'foo', 'bar', 5, 'baz')
// Also you could use it to verify that a value isn't an `undefined` like that:
//   provedGet(varName, [])
export default (obj, path, ...restPath) => {
    if (process.env.NODE_ENV === 'production') {

        if (restPath.length > 0) {
            restPath.unshift(path)
            return get(obj, restPath)
        } else if (path.length === 0)
            return obj
        else
            return get(obj, path)

    } else { // for development

        if (restPath.length > 0)
            path = [path].concat(restPath)

        const result = path.length === 0 ? obj : get(obj, path)

        if (result === undefined)
            throw new Error(
                `Failed to obtain a value by this path: ${JSON.stringify(path)} ` +
                `(provided source object type: ${typeof obj}, `+
                `top-level available keys: ${JSON.stringify(obj ? Object.keys(obj) : null)})`
            )
        else
            return result
    }
}
