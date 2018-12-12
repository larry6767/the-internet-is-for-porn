import {
    map,
} from 'lodash'
import {getOrderedVideoList} from './index'

export default (ids, items) => map(
    getOrderedVideoList(ids, items),
    ({
        id, thumb_url, thumb_url_mask, thumbs, title,
        id_sponsor, tags, url_regular, thumb_top, length
    }) => ({
        // It's supposed to be a number (not a string, as returned by backend),
        // because `x.page.GALS_INFO.ids` contains these ids as numbers.
        id: Number(id),

        thumb: thumb_url,
        thumbMask: thumb_url_mask,
        thumbs,
        title,
        sponsorId: id_sponsor,
        tags,

        // This is for very small string under a video preview,
        // it's usually only one single tag.
        tagsShort: tags.reduce((acc, tag) => {
            const newAcc = acc === '' ? tag : `${acc}, ${tag}`
            return newAcc.length <= 22 ? newAcc : acc
        }, ''),

        urlRegular: url_regular,
        favorite: thumb_top,
        duration: length,
    })
)
