import {mapValues} from 'lodash'
import {ImmutablePropTypes, PropTypes, plainProvedGet as g} from '../../App/helpers'

const
    videoItemModelProps = Object.freeze({
        id: PropTypes.number,

        thumb: PropTypes.string, // an URL
        thumbMask: PropTypes.string, // an URL with "{num}" placeholder
        thumbs: PropTypes.arrayOf(PropTypes.number),
        favorite: PropTypes.number,

        title: PropTypes.string,
        sponsorId: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),

        // This is for very small string under a video preview, it's usually only one single tag.
        tagsShort: PropTypes.string,

        duration: PropTypes.string,

        videoPageRef: PropTypes.oneOfType([
            // Either an internal video id
            PropTypes.number,

            // or a link (URL) to an external resource
            (props, propName, componentName) => {
                if (typeof props[propName] !== 'string')
                    return new Error(
                        `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                        `(it's not a string but ${typeof props[propName]}). Validation failed.`
                    )
                if (!/^http/.test(props[propName]))
                    return new Error(
                        `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                        `(link to an external resource must start with "http"). Validation failed.`
                    )
            },
        ])
    }),

    // {foo: 'foo', bar: 'bar'}
    videoItemModelPropsKeys = Object.freeze(mapValues(videoItemModelProps, (x, k) => k))

export const
    videoItemModel = PropTypes.exact(videoItemModelProps),

    // immutable.js version of `videoItemModel` model
    immutableVideoItemModel = ImmutablePropTypes.exact(mapValues(videoItemModelProps, (x, k) =>
        k === g(videoItemModelPropsKeys, 'thumbs')
        ? ImmutablePropTypes.listOf(PropTypes.number)
        : k === g(videoItemModelPropsKeys, 'tags')
        ? ImmutablePropTypes.listOf(PropTypes.string)
        : x
    ))
