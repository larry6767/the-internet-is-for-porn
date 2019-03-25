import {PropTypes} from 'src/App/helpers'
import {nichesListWithThumbModel, modelsListModel} from 'src/App/models'
import {incomingPageTextModel, pageTextModel} from 'ssr/lib/helpers/mapFns/getPageText'
import {lettersModel, itemsModel} from 'ssr/lib/helpers/mapFns/getModelsList'
import {incomingNichesListModel} from 'ssr/lib/helpers/mapFns/getNichesList'

export const
    homeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            TAGS_INFO: PropTypes.shape({
                items: incomingNichesListModel,
            }),
            MODELS_BY_LETTERS: PropTypes.shape({
                letters: lettersModel,
            }),
            MODELS_BY_LETTERS_MODELS_INFO: PropTypes.shape({
                items: itemsModel,
            }),
            PAGE_TEXT: incomingPageTextModel,
        }),
    }),

    mappedHomeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        nichesListWithThumb: nichesListWithThumbModel,
        pornstarsList: modelsListModel,
        allPornstarsQuantity: PropTypes.number,
        pageText: pageTextModel,
    })
