import {PropTypes} from 'src/App/helpers'
import {incomingPageTextModel, pageTextModel} from 'ssr/lib/helpers/mapFns/getPageText'
import {modelsListWithLetterModel} from 'ssr/lib/helpers/mapFns/getModelsList'

export const
    homeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            TAGS_INFO: PropTypes.object, // TODO better type
            MODELS_BY_LETTERS: PropTypes.object, // TODO better type
            MODELS_BY_LETTERS_MODELS_INFO: PropTypes.object, // TODO better type
            PAGE_TEXT: incomingPageTextModel,
        }),
    }),

    mappedHomeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        nichesWithThumbsList: PropTypes.arrayOf(PropTypes.object), // TODO better type
        nichesList: PropTypes.arrayOf(PropTypes.object), // TODO better type
        pornstarsList: modelsListWithLetterModel,
        pageText: pageTextModel,
    })
