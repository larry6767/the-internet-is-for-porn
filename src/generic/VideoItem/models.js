import {ImmutablePropTypes, PropTypes} from '../../App/helpers'

const
    videoItemModelBuilder = process.env.NODE_ENV === 'production' ? null : isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
            list = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf

        return exact({
            id: PropTypes.number,

            thumb: PropTypes.string, // an URL
            thumbMask: PropTypes.string, // an URL with "{num}" placeholder
            thumbs: list(PropTypes.number),
            firstThumb: PropTypes.number,

            title: PropTypes.string,
            sponsorName: PropTypes.string,
            tags: list(PropTypes.string),

            // This is for very small string under a video preview,
            // it's usually only one single tag.
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
                            '(link to an external resource must start with "http"). ' +
                            'Validation failed.'
                        )
                },
            ])
        })
    }

export const
    videoItemModel = process.env.NODE_ENV === 'production' ? null :
        videoItemModelBuilder(false),
    immutableVideoItemModel = process.env.NODE_ENV === 'production' ? null :
        videoItemModelBuilder(true)
