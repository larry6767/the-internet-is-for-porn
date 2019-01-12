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

        url: PropTypes.string, // TODO FIXME refactor this
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
