import {isPlainObject, isArray, isBoolean, isNumber, isString, isNull, mapValues} from 'lodash'

const scalarCheckers = Object.freeze([isBoolean, isNumber, isString, isNull])

// Function that helps to deeply freeze an Object with all objects inside (see Object.freeze).
const deepFreeze = src => {
    if (isPlainObject(src))
        return Object.freeze(mapValues(src, deepFreeze))
    else if (isArray(src))
        return Object.freeze(src.map(deepFreeze))
    else if (scalarCheckers.some(f => f(src)))
        // no need to freeze a scalar value
        return src
    else
        throw new Error(
            `Type of provided source value argument is not allowed to deeply freeze ` +
            `(type is ${typeof src}), only plain object, array or simple scalar values are allowed`
        )
}

export default deepFreeze
