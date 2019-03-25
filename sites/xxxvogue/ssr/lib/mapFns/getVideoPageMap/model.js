import {PropTypes} from 'src/App/helpers'
import {videoItemModel} from 'src/generic/VideoItem/models'
import {incomingVideoItemModel} from 'ssr/lib/helpers/mapFns/getFilteredVideoList'
import {incomingVideoPageTextModel, videoPageTextModel} from 'ssr/lib/helpers/mapFns/getPageText'
import {incomingGalleryModel, publishedTemplateModel} from 'ssr/lib/helpers/mapFns/getGallery'
import {galleryModel, openGraphDataModel} from 'src/App/VideoPage/models'

export const
    videoPageModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            GALLERY: incomingGalleryModel,
            PAGE_URL: PropTypes.string,
            TIME_AGO: publishedTemplateModel,
            PAGE_TEXT: incomingVideoPageTextModel,
            GALS_INFO: PropTypes.shape({
                ids: PropTypes.arrayOf(PropTypes.number),
                items: PropTypes.objectOf(incomingVideoItemModel),
            }),
        }),
    }),

    mappedVideoPageModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        openGraphData: openGraphDataModel,
        gallery: galleryModel,
        pageText: videoPageTextModel,
        videoList: PropTypes.arrayOf(videoItemModel),
    })
