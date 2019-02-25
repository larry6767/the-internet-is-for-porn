import {mapValues, uniq} from 'lodash'
import {PropTypes, assertPropTypes, plainProvedGet as g} from '../../../App/helpers'
import {galleryModel, openGraphDataModel} from '../../../App/VideoPage/models'

const
    galleryModelProps = process.env.NODE_ENV === 'production' ? null : Object.freeze({
        id: PropTypes.string, // but actually a number
        id_class: PropTypes.string, // but actually a number
        title: PropTypes.string,
        embed_code: PropTypes.string,
        id_sponsor: PropTypes.string,
        url: PropTypes.string,
        published: PropTypes.string, // but actually a number (of seconds, unix time)
        length: PropTypes.string, // but actually a number (of seconds, unix time)

        thumb_url: PropTypes.string,
        thumbs: PropTypes.arrayOf(PropTypes.string), // but actually an array of numbers
        thumb_top: PropTypes.string,

        tags: PropTypes.arrayOf(PropTypes.string),
    }),

    pageUrlModel = process.env.NODE_ENV === 'production' ? null : PropTypes.string,

    // actually a list of two elements
    publishedTemplateItemModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.exactTuple([
            PropTypes.string, // singular, example: "1 year ago"
            PropTypes.string, // multiple, example: "%d years ago"
        ]),

    publishedTemplateModelProps = process.env.NODE_ENV === 'production' ? null : Object.freeze({
        y: publishedTemplateItemModel,
        m: publishedTemplateItemModel,
        d: publishedTemplateItemModel,
        w: publishedTemplateItemModel,
        h: publishedTemplateItemModel,
        i: publishedTemplateItemModel,
        s: publishedTemplateItemModel,
    })

export const
    incomingGalleryModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.shape(galleryModelProps),

    publishedTemplateModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.shape(publishedTemplateModelProps),

    sponsorsModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.objectOf(PropTypes.shape({name: PropTypes.string}))

const
    // {foo: 'foo', bar: 'bar'}
    galleryModelPropsKeys = process.env.NODE_ENV === 'production' ? null :
        Object.freeze(mapValues(galleryModelProps, (x, k) => k)),

    // get incoming property by verified key (which must be presented in the model)
    getProp = process.env.NODE_ENV === 'production' ? g :
        (src, propKey, ...xs) => g(src, g(galleryModelPropsKeys, propKey), ...xs),

    // {foo: 'foo', bar: 'bar'}
    publishedTemplateModelPropsKeys = process.env.NODE_ENV === 'production' ? null :
        Object.freeze(mapValues(publishedTemplateModelProps, (x, k) => k)),

    // get incoming property of "publishedTemplate" by verified key
    // (which must be presented in the model)
    getPubTplProp = process.env.NODE_ENV === 'production' ? g :
        (src, propKey, ...xs) => g(src, g(publishedTemplateModelPropsKeys, propKey), ...xs)

export default (data, pageUrl, publishedTemplate, sponsors) => {
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(incomingGalleryModel, data, 'getGallery', 'original source gallery data')
        assertPropTypes(pageUrlModel, pageUrl, 'getGallery', 'page url')

        assertPropTypes(
            publishedTemplateModel,
            publishedTemplate,
            'getGallery',
            'published template'
        )

        assertPropTypes(sponsorsModel, sponsors, 'getGallery', 'sponsors')
    }

    const
        publishedDate = new Date(Date.now() - getProp(data, 'published') * 1000),
        years = publishedDate.getFullYear() - 1970,
        months = publishedDate.getMonth(),
        days = publishedDate.getDate(),
        hours = publishedDate.getHours(),
        minutes = publishedDate.getMinutes(),

        published
            = years && years === 1
            ? getPubTplProp(publishedTemplate, 'y', 0)
            : years
            ? getPubTplProp(publishedTemplate, 'y', 1).replace('%d', years)

            : months && months === 1
            ? getPubTplProp(publishedTemplate, 'm', 0)
            : months
            ? getPubTplProp(publishedTemplate, 'm', 1).replace('%d', months)

            : days && days === 1
            ? getPubTplProp(publishedTemplate, 'd', 0)
            : days === 7
            ? getPubTplProp(publishedTemplate, 'w', 0)
            : days === 14
            ? getPubTplProp(publishedTemplate, 'w', 1).replace('%d', days / 7)
            : days === 21
            ? getPubTplProp(publishedTemplate, 'w', 1).replace('%d', days / 7)
            : days === 28
            ? getPubTplProp(publishedTemplate, 'w', 1).replace('%d', days / 7)
            : days
            ? getPubTplProp(publishedTemplate, 'd', 1).replace('%d', days)

            : hours && hours === 1
            ? getPubTplProp(publishedTemplate, 'h', 0)
            : hours
            ? getPubTplProp(publishedTemplate, 'h', 1).replace('%d', hours)

            : minutes && minutes === 1
            ? getPubTplProp(publishedTemplate, 'm', 0)
            : minutes
            ? getPubTplProp(publishedTemplate, 'm', 1).replace('%d', minutes)

            : getPubTplProp(publishedTemplate, 's', 0),

        length = Number(getProp(data, 'length')),

        result = {
            id: Number(getProp(data, 'id')),
            classId: Number(getProp(data, 'id_class')),
            title: getProp(data, 'title'),
            urlForIframe: g(getProp(data, 'embed_code').match(/src="([\S]+)"/), 1),
            sponsorName: g(sponsors, getProp(data, 'id_sponsor'), 'name'),
            sponsorLink: `${g(sponsors, getProp(data, 'id_sponsor'), 'name')} porn`,
            sponsorUrl: getProp(data, 'url'),
            published,

            // The following data is used for ADD_VIDEO_TO_FAVORITE action:
            thumb: getProp(data, 'thumb_url'),
            thumbMask: getProp(data, 'thumb_url').replace(/-\d+.jpg/, '-{num}.jpg'),
            thumbs: getProp(data, 'thumbs').map(x => Number(x)),
            firstThumb: Number(getProp(data, 'thumb_top')),
            tags: uniq(getProp(data, 'tags')),
            // This is for very small string under a video preview,
            // it's usually only one single tag.
            tagsShort: getProp(data, 'tags').reduce((acc, tag) => {
                const newAcc = acc === '' ? tag : `${acc}, ${tag}`
                return g(newAcc, 'length') <= 22 ? newAcc : acc
            }, ''),

            duration: `${
                Math.floor(length / 60)
            }:${
                length % 60 < 10 ? '0' + length % 60 : length % 60
            }`,

            videoPageRef: Number(pageUrl.match(/\/vid-(\d+)\//)[1]),
        }

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(galleryModel, result, 'getGallery', 'result gallery data')

    return result
}

export const
    getOpenGraphData = (data, swfPlugUrl) => {
        if (process.env.NODE_ENV !== 'production') {
            assertPropTypes(
                incomingGalleryModel,
                data,
                'getOpenGraphData',
                'original source gallery data'
            )
        }

        const
            result = {
                id: Number(getProp(data, 'id')),
                title: getProp(data, 'title'),
                thumb: getProp(data, 'thumb_url'),
                tags: getProp(data, 'tags'),
                duration: Number(getProp(data, 'length')),
                swfPlugUrl,
            }

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(openGraphDataModel, result, 'getOpenGraphData', 'result gallery data')

        return result
    }
