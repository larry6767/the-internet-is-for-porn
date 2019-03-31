import {PropTypes} from 'src/App/helpers'
import {nichesListWithThumbModel, pornstarsListWithLetterModel} from 'src/App/models'
import {incomingPageTextModel, pageTextModel} from 'ssr/lib/helpers/mapFns/getPageText'
import {pornstarsLettersModel, pornstarsItemsModel} from 'ssr/lib/helpers/mapFns/getPornstarsList'
import {incomingNichesListModel} from 'ssr/lib/helpers/mapFns/getNichesList'

export const
    homeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            TAGS_INFO: PropTypes.shape({
                items: incomingNichesListModel,
            }),
            MODELS_BY_LETTERS: PropTypes.shape({
                letters: pornstarsLettersModel,
            }),
            MODELS_BY_LETTERS_MODELS_INFO: PropTypes.shape({
                items: pornstarsItemsModel,
            }),
            PAGE_TEXT: incomingPageTextModel,
        }),
    }),

    mappedHomeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        nichesList: nichesListWithThumbModel,
        pornstarsList: pornstarsListWithLetterModel,
        pageText: pageTextModel,
    })
