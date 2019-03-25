import {map, concat, sortBy, reduce} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'
import {modelsListModel, modelsListWithLetterModel} from 'src/App/models'

const
    letterKeyModel = process.env.NODE_ENV === 'production' ? null :
        (props, propName, componentName) => {
            const propValue = props[propName]
            if (typeof propValue !== 'string')
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it's not a string but ${typeof propValue}). Validation failed.`
                )
            if (propValue.length !== 1 || propValue !== propValue.toUpperCase())
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it must be one uppercase letter). Validation failed.`
                )
        },

    letterModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        id: PropTypes.string, // but actually is a number
        name: PropTypes.string,
        sub_url: PropTypes.string,
        items_count: PropTypes.string, // but actually is a number
    }),

    nestedLettersModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.objectOf(PropTypes.objectOf(letterModel))

export const
    // {'A': {'1234': {...}}, 'B': {'4321': {...}}, ...}
    lettersModel = process.env.NODE_ENV === 'production' ? null :
        (props, propName, componentName, ...etc) => {
            const propValue = props[propName]
            if (typeof propValue !== 'object')
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it's not a object but ${typeof propValue}). Validation failed.`
                )
            for (const key of Object.keys(propValue)) {
                const error = letterKeyModel({[propName]: key}, propName, componentName, ...etc)
                if (error) return error
            }
            return nestedLettersModel(props, propName, componentName, ...etc)
        },

    // keys are `letters[].id`s
    itemsModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.objectOf(PropTypes.shape({
            thumb_url: PropTypes.string,
        }))

export default (letters, items, withLetter = false) => {
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(lettersModel, letters, 'getModelsList', 'letters')
        assertPropTypes(itemsModel, items, 'getModelsList', 'original source')
    }

    const
        result = reduce(
            letters,
            (acc, letter, key) => concat(acc, sortBy(
                map(letter, x => {
                    const model = {
                        id: Number(g(x, 'id')),
                        name: g(x, 'name'),
                        subPage: g(x, 'sub_url'),
                        itemsCount: Number(g(x, 'items_count')),
                        thumb: g(items, g(x, 'id'), 'thumb_url'),
                    }

                    if (withLetter)
                        model.letter = g(key, [])

                    return model
                }),
                o => g(o, 'name')
            )),
            []
        )

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            withLetter ? modelsListWithLetterModel : modelsListModel,
            result,
            'getModelsList',
            'result data'
        )

    return result
}
