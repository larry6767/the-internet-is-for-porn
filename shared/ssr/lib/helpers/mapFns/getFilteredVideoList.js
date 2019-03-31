import {map, mapValues, take} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'
import {videoItemModel} from 'src/generic/VideoItem/models'
import {internalLinkReg, externalLinkReg} from 'ssr/lib/models'
import getOrderedVideoList from 'ssr/lib/helpers/mapFns/getOrderedVideoList'

const
    incomingModelProps = process.env.NODE_ENV === 'production' ? null : Object.freeze({
        // It's supposed to be a number (not a string, as returned by backend),
        // because `x.page.GALS_INFO.ids` contains these ids as numbers.
        id: PropTypes.string,

        title: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        length: PropTypes.string, // but actually a number

        sponsor: PropTypes.string,

        extra_link: PropTypes.shape({link: PropTypes.string}),

        // example: ["1", "2", "3", ..., "10"],
        // looks like it is a list of numbers actually
        thumbs: PropTypes.arrayOf(PropTypes.string),

        // example: "10" (it looks like it is a last element of `thumbs`)
        // looks like it is a number actually
        thumb_top: PropTypes.string,

        // looks like it's `thumb_url_mask` but with "{num}" replaced with "thumb_top"
        thumb_url: PropTypes.string,

        // a link with "{num}" mask, which I guess is one of `thumbs`
        thumb_url_mask: PropTypes.string,

        // this one is annoying actually, since a number after "vid-" is not presented anywhere else
        // as bare value, we have to extract it from this string.
        // example: "/vid-19838154/Hot-blonde-fuckedby-old-ugly-bastard.htm"
        // also it could be an external link which starts with "http"
        url: (props, propName, componentName) => {
            if (typeof props[propName] !== 'string')
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it's not a string but ${typeof props[propName]}). Validation failed.`
                )
            if (
                // internal link to a video page
                !internalLinkReg.test(props[propName]) &&
                // link to an external resourse
                !externalLinkReg.test(props[propName])
            )
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it doesn't match neither internal video link nor an external link). `+
                    'Validation failed.'
                )
        }
    }),

    // {foo: 'foo', bar: 'bar'}
    incomingModelPropsKeys = process.env.NODE_ENV === 'production' ? null :
        Object.freeze(mapValues(incomingModelProps, (x, k) => k)),

    // get incoming property by verified key (which must be presented in the model)
    getProp = process.env.NODE_ENV === 'production' ? g :
        (src, propKey, ...xs) => g(src, g(incomingModelPropsKeys, propKey), ...xs),

    // `shape` instead of `exact` because we may just ignore some of the fields
    incomingModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.shape(incomingModelProps)

export {incomingModel as incomingVideoItemModel}

export default (ids, items) => map(getOrderedVideoList(ids, items), x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(incomingModel, x, 'getFilteredVideoList', 'original source video item')

    const
        length = Number(getProp(x, 'length')),
        url = getProp(x, 'url'),
        internalUrlMatches = url.match(internalLinkReg),
        extraLink = getProp(x, 'extra_link', 'link').match(/q=(.+)&/),

        result = {
            id: Number(getProp(x, 'id')),

            thumb: getProp(x, 'thumb_url'),
            thumbMask: getProp(x, 'thumb_url_mask'),
            thumbs: getProp(x, 'thumbs').map(x => Number(x)),
            firstThumb: Number(getProp(x, 'thumb_top')),

            title: getProp(x, 'title'),
            sponsorName: getProp(x, 'sponsor'),
            sponsorLink: extraLink ? extraLink[1] : `${getProp(x, 'sponsor')} porn`,

            tagsShort: take(getProp(x, 'tags'), 3),

            duration: `${
                Math.floor(length / 60)
            }:${
                length % 60 < 10 ? '0' + length % 60 : length % 60
            }`,

            videoPageRef: internalUrlMatches !== null ? Number(g(internalUrlMatches, 2)) : url,
        }

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(videoItemModel, result, 'getFilteredVideoList', 'result video item')

    return result
})
