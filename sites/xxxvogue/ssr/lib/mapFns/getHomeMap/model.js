import {PropTypes} from 'src/App/helpers'

import {
    nichesListWithThumbModel,
    nichesListWithLetterModel,
    pornstarsListModel,
} from 'src/App/models'

import {incomingPageTextModel, pageTextModel} from 'ssr/lib/helpers/mapFns/getPageText'

import {
    pornstarsLettersModel,
    pornstarsItemsModel,
    nichesLettersModel,
} from 'ssr/lib/helpers/mapFns/getPornstarsList'

import {incomingNichesListModel} from 'ssr/lib/helpers/mapFns/getNichesList'

export const
    homeModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape({
        page: PropTypes.shape({
            TAGS_INFO: PropTypes.shape({
                items: incomingNichesListModel,
            }),
            TAGS_BY_LETTERS: PropTypes.shape({
                letters: nichesLettersModel,
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
        nichesListWithThumb: nichesListWithThumbModel,
        nichesListWithLetter: nichesListWithLetterModel,
        pornstarsList: pornstarsListModel,
        allPornstarsQuantity: PropTypes.number,
        pageText: pageTextModel,
    })
