import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'

import {
    getFilteredVideoList,
    getGallery,
    getOpenGraphData,
    getVideoPageText,
} from 'ssr/lib/helpers/mapFns'

import {videoPageModel, mappedVideoPageModel} from 'ssr/lib/mapFns/getVideoPageMap/model'

export default x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(videoPageModel, x, 'getVideoPageMap', 'video page source from backend')

    const
        result = {
            openGraphData: getOpenGraphData(g(x, 'page', 'GALLERY'), g(x, 'page', 'PAGE_URL')),
            gallery: getGallery(
                g(x, 'page', 'GALLERY'),
                g(x, 'page', 'PAGE_URL'),
                g(x, 'page', 'TIME_AGO'),
                g(x, 'page', 'CUSTOM_DATA', 'searchSponsors')
            ),

            pageText: getVideoPageText(g(x, 'page', 'PAGE_TEXT')),

            videoList: getFilteredVideoList(
                g(x, 'page', 'GALS_INFO', 'ids'),
                g(x, 'page', 'GALS_INFO', 'items')
            ),
        }

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            mappedVideoPageModel,
            result,
            'getVideoPageMap',
            'mapped video page data'
        )

    return result
}
