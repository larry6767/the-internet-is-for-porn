import {
    ImmutablePropTypes,
    PropTypes,
} from '../helpers'

import {
    immutablePageTextModel,
    pageRequestParamsModel,
} from '../models'

import {immutableVideoItemModel} from '../../generic/VideoItem/models'

const
    openGraphDataModelBuilder = process.env.NODE_ENV === 'production' ? null :
        isImmutable => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                arrayOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf,
                // TODO get rid of 'isOptional'
                props = {
                    title: PropTypes.string.isOptional,
                    thumb: PropTypes.string.isOptional,
                    tags: arrayOf(PropTypes.string).isOptional,
                    duration: PropTypes.number.isOptional,
                }

            return exact(props)
        },

    galleryModelBuilder = process.env.NODE_ENV === 'production' ? null :
        isImmutable => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                arrayOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf,
                // TODO get rid of 'isOptional'
                props = {
                    id: PropTypes.number.isOptional,
                    classId: PropTypes.number.isOptional,
                    title: PropTypes.string.isOptional,
                    urlForIframe: PropTypes.string.isOptional,
                    sponsorName: PropTypes.string.isOptional,
                    sponsorLink: PropTypes.string.isOptional,
                    sponsorUrl: PropTypes.string.isOptional,
                    published: PropTypes.string.isOptional,

                    thumb: PropTypes.string.isOptional,
                    thumbMask: PropTypes.string.isOptional,
                    thumbs: arrayOf(PropTypes.number).isOptional,
                    firstThumb: PropTypes.number.isOptional,

                    tags: arrayOf(PropTypes.string).isOptional,
                    tagsShort: PropTypes.string.isOptional,

                    duration: PropTypes.string.isOptional,
                    videoPageRef: PropTypes.number.isOptional,
                }

            return exact(props)
        },

    immutableGalleryModel = process.env.NODE_ENV === 'production' ? null :
        galleryModelBuilder(true),

    immutableOpenGraphDataModel = process.env.NODE_ENV === 'production' ? null :
        openGraphDataModelBuilder(true)

export const
    galleryModel = process.env.NODE_ENV === 'production' ? null :
        galleryModelBuilder(false),

    openGraphDataModel = process.env.NODE_ENV === 'production' ? null :
        openGraphDataModelBuilder(false),

    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        inlineAdvertisementIsShowed: PropTypes.bool,
        pageText: immutablePageTextModel,
        openGraphData: immutableOpenGraphDataModel,
        gallery: immutableGalleryModel,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })
