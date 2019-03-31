import {PropTypes} from 'src/App/helpers'

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
    pornstarsLettersModel = process.env.NODE_ENV === 'production' ? null :
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
    pornstarsItemsModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.objectOf(PropTypes.shape({
            thumb_url: PropTypes.string,
        })),

    nichesLettersModel = pornstarsLettersModel
