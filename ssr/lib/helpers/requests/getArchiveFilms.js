import {mapValues} from 'lodash'

import {plainProvedGet as g, PropTypes, assertPropTypes} from '../../../App/helpers'
import {archiveIdModel, archiveFilmsModel} from '../../../App/models'

const
    urlReg = /\/(\d{4})-(\d{2})-archive.html$/,

    incomingModelProps = Object.freeze({
        ACTIVE: PropTypes.oneOfType([
            // check whether it's zero number
            (props, propName, componentName) => {
                if (typeof props[propName] !== 'number')
                    return new Error(
                        `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                        `(it's not a number but ${typeof props[propName]}). Validation failed.`
                    )
                if (props[propName] !== 0)
                    return new Error(
                        `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                        `(it's not zero). Validation failed.`
                    )
            },

            archiveIdModel,
        ]),

        URL: (props, propName, componentName) => {
            if (typeof props[propName] !== 'string')
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it's not a string but ${typeof props[propName]}). Validation failed.`
                )
            if (!urlReg.test(props[propName]))
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it doesn't match archive link). Validation failed.`
                )
        },
    }),

    // {foo: 'foo', bar: 'bar'}
    incomingModelPropsKeys = Object.freeze(mapValues(incomingModelProps, (x, k) => k)),

    // get incoming property by verified key (which must be presented in the model)
    getProp = (src, propKey) => g(src, g(incomingModelPropsKeys, propKey)),

    // `shape` instead of `exact` because we may just ignore some of the fields
    incomingModel = PropTypes.shape(incomingModelProps)

export {incomingModel as incomingArchiveFilmsModel}

export default x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(incomingModel, x, 'getArchiveFilms', 'original source')

    const
        currentlyActiveId = getProp(x, 'ACTIVE'),
        match = getProp(x, 'URL').match(urlReg),

        result = {
            currentlyActiveId: currentlyActiveId === 0 ? null : currentlyActiveId,
            year: Number(g(match, 1)),
            month: Number(g(match, 2)),
        }

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(archiveFilmsModel, result, 'getArchiveFilms', 'result data')

    return result
}
