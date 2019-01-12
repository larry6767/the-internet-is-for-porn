import {map, mapValues} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../../../App/helpers'
import {videoItemModel} from '../../../generic/VideoItem/models'
import {getOrderedVideoList} from './index'

const
    incomingModelProps = Object.freeze({
        // It's supposed to be a number (not a string, as returned by backend),
        // because `x.page.GALS_INFO.ids` contains these ids as numbers.
        id: PropTypes.string,

        title: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        length: PropTypes.string, // but actually a number

        // it could be a number, but i'm not sure if it's always a number
        id_sponsor: PropTypes.string,

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
        url: PropTypes.string, // TODO FIXME
    }),

    // {foo: 'foo', bar: 'bar'}
    incomingModelPropsKeys = mapValues(incomingModelProps, (x, k) => k),

    // get incoming property by verified key (which must be presented in the model)
    getProp = (src, propKey) => g(src, g(incomingModelPropsKeys, propKey)),

    // `shape` instead of `exact` because we may just ignore some of the fields
    incomingModel = PropTypes.shape(incomingModelProps)

export default (ids, items) => map(getOrderedVideoList(ids, items), x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(incomingModel, x)

    const
        length = Number(getProp(x, 'length')),

        result = {
            id: Number(getProp(x, 'id')),

            thumb: getProp(x, 'thumb_url'),
            thumbMask: getProp(x, 'thumb_url_mask'),
            thumbs: getProp(x, 'thumbs').map(x => Number(x)),
            favorite: Number(getProp(x, 'thumb_top')),

            title: getProp(x, 'title'),
            sponsorId: getProp(x, 'id_sponsor'),
            tags: getProp(x, 'tags'),

            tagsShort: getProp(x, 'tags').reduce((acc, tag) => {
                const newAcc = acc === '' ? tag : `${acc}, ${tag}`
                return newAcc.length <= 22 ? newAcc : acc
            }, ''),

            duration: `${
                Math.floor(length / 60)
            }:${
                length % 60 < 10 ? '0' + length % 60 : length % 60
            }`,

            // TODO FIXME crappy solution
            url: getProp(x, 'url').slice(0, getProp(x, 'url').indexOf('.htm')),
        }

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(videoItemModel, result)

    return result
})
