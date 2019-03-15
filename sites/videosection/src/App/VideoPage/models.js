import {ImmutablePropTypes, PropTypes} from 'src/App/helpers'
import {immutableVideoPageTextModel, pageRequestParamsModel} from 'src/App/models'
import {immutableVideoItemModel} from 'src/generic/VideoItem/models'

const
    openGraphDataModelBuilder = process.env.NODE_ENV === 'production' ? null :
        isImmutable => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                arrayOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf,
                props = {
                    id: PropTypes.number,
                    title: PropTypes.string,
                    thumb: PropTypes.string,
                    tags: arrayOf(PropTypes.string),
                    duration: PropTypes.number,
                    swfPlugUrl: PropTypes.string,
                }

            return PropTypes.nullable(exact(props))
        },

    galleryModelBuilder = process.env.NODE_ENV === 'production' ? null :
        isImmutable => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                arrayOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf,
                props = {
                    id: PropTypes.number,
                    classId: PropTypes.number,
                    title: PropTypes.string,
                    urlForIframe: PropTypes.string,
                    sponsorName: PropTypes.string,
                    sponsorLink: PropTypes.string,
                    sponsorUrl: PropTypes.string,
                    published: PropTypes.string,

                    thumb: PropTypes.string,
                    thumbMask: PropTypes.string,
                    thumbs: arrayOf(PropTypes.number),
                    firstThumb: PropTypes.number,

                    tags: arrayOf(PropTypes.string),
                    tagsShort: arrayOf(PropTypes.string),

                    duration: PropTypes.string,
                    videoPageRef: PropTypes.number,
                }

            return PropTypes.nullable(exact(props))
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
        pageText: PropTypes.nullable(immutableVideoPageTextModel),
        openGraphData: immutableOpenGraphDataModel,
        gallery: immutableGalleryModel,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })
