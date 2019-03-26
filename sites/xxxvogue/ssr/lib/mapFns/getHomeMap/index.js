import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'

import {
    getNichesList,
    getNichesListByLetters,
    getPornstarsList,
    getPageText
} from 'ssr/lib/helpers/mapFns'

import {homeModel, mappedHomeModel} from 'ssr/lib/mapFns/getHomeMap/model'

export default x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(homeModel, x, 'getHomeMap', 'home page source from backend')

    const
        result = {
            nichesListWithThumb: getNichesList(g(x, 'page', 'TAGS_INFO', 'items'), 12, true),
            nichesListWithLetter: getNichesListByLetters(
                g(x, 'page', 'TAGS_BY_LETTERS', 'letters'),
                true,
            ),
            pornstarsList: getPornstarsList(
                g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
                g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
                16,
                false,
            ),
            allPornstarsQuantity: g(x, 'page', 'MODELS_BY_LETTERS', 'tags_count'),
            pageText: getPageText(g(x, 'page', 'PAGE_TEXT'))
        }

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            mappedHomeModel,
            result,
            'getHomeMap',
            'mapped home page data'
        )

    return result
}
