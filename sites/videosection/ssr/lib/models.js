import {set} from 'lodash'

// local libs
import {PropTypes} from 'src/App/helpers'
import {pageKeys} from 'src/App/models'

const
    getPageDataParamsOptionsModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        // for now it is the only option we use
        blocks: PropTypes.exact({
            allTagsBlock: PropTypes.number.isOptional,
            extendedTagsBlock: PropTypes.number.isOptional,
            modelsABCBlockText: PropTypes.number.isOptional,
            modelsABCBlockThumbs: PropTypes.number.isOptional,
            updateSponsorURL: PropTypes.number.isOptional,
            updateExtraURL: PropTypes.number.isOptional,
            searchSponsors: PropTypes.number.isOptional,
        }).isOptional,
    }),

    getPageDataParamsModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        url: PropTypes.string,
        options: getPageDataParamsOptionsModel.isOptional,
    })


export const
    getPageDataResultModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exactTuple([
        PropTypes.nullable(getPageDataParamsOptionsModel),
        PropTypes.func, // raw backend response to proper and filtered data map function
    ]),

    getPageDataReqBodyModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        operation: PropTypes.string,
        params: getPageDataParamsModel,
    }),

    getPageDataPageMappingModel = PropTypes.exact(
        pageKeys.reduce((o, k) => set(o, k, getPageDataResultModel), {})
    )

const
    orderingItemModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        ACTIVE: PropTypes.bool,
        URL: PropTypes.string,
    }).isOptional

export const
    orderingModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        sort_LATEST: orderingItemModel,
        sort_LONGEST: orderingItemModel,
        sort_POPULAR: orderingItemModel,
        sort_RELEVANT: orderingItemModel,
    })

// regs for mapFns helpers
export const
    archiveUrlReg = /\/(\d{4})-(\d{2})-archive.html$/,
    internalLinkReg = /^(\/[^\/]+)?\/vid-(\d+)\/[^\/]+.htm$/,
    externalLinkReg = /^http/
