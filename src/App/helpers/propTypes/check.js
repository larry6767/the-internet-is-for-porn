/*
This module is forked from https://github.com/ratehub/check-prop-types to make this checker for for
production mode too.

Forked from this commit (v1.1.2):
    https://github.com/ratehub/check-prop-types/commit/b257ae58664dae93d5be31753c1e954ee4440f90

License: MIT https://github.com/ratehub/check-prop-types/blob/master/LICENSE
*/

import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret'

export const
    checkPropTypes = (model, value, location, componentName, getStack) => {
        const name = componentName ? `${componentName}: ` : ''

        if (typeof model !== 'function')
            return (
                `${name}${location} type is invalid; ` +
                'it must be a function, usually one of PropTypes.'
            )

        // Prop type validation may throw.
        // In case they do, catch and save the exception as the error.
        let error
        try {
            error = model({'': value}, '', componentName, location, null, ReactPropTypesSecret)
        } catch (ex) {
            error = ex
        }

        if (error && !(error instanceof Error))
            return (
                `${name}type specification of ${location} is invalid; ` +
                'the type checker function must return `null` or an `Error` but returned a ' +
                `${typeof error}. You may have forgotten to pass an argument to the type checker ` +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).'
            )

        if (error instanceof Error) {
            const stack = getStack && getStack() || ''
            return `Failed ${location} type: ${error.message}${stack}`
        }
    },

    // Throws an exception instead of just returning an error message as `checkPropTypes` does.
    assertPropTypes = (...args) => {
        const error = checkPropTypes(...args)
        if (error) throw new Error(error)
    }
