import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'
import {getNichesList, getModelsList, getPageText} from 'ssr/lib/helpers/mapFns'
import {homeModel, mappedHomeModel} from 'ssr/lib/mapFns/getHomeMap/model'

export default x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(homeModel, x, 'getHomeMap', 'home page source from backend')

    const
        result = {
            nichesWithThumbsList: getNichesList(g(x, 'page', 'TAGS_INFO', 'items'), 12, true),
            nichesList: getNichesList(g(x, 'page', 'TAGS_INFO', 'items')),
            pornstarsList: getModelsList(
                g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
                g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
                true
            ),
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
