import {isImmutable, getIn} from 'immutable'

// Safe way to obtain value by path from an immutable Map/List/etc.
// By "safe" I mean it guarantees that value is not `undefined` otherwise it throws exception,
// this function helps to avoid unexpected behavior and crazy bugs which hard to debug.
//
// Usage examples:
//   provedGet(immutableObj, ['foo', 'bar', 5, 'baz'])
//   provedGet(immutableObj, 'foo', 'bar', 5, 'baz')
export default (immutableObj, path, ...restPath) => {
    if (restPath.length > 0)
        path = [path].concat(restPath)

    if ( ! isImmutable(immutableObj))
        throw new Error(
            `Failed to obtain a value by this path: ${JSON.stringify(path)} ` +
            'because provided source object is not an immutable.js structure ' +
            `(type is: ${typeof immutableObj})`
        )

    const result = getIn(immutableObj, path)

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
