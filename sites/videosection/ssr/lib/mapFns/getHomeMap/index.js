import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'
import {getNichesList, getPornstarsList, getPageText} from 'ssr/lib/helpers/mapFns'
import {homeModel, mappedHomeModel} from 'ssr/lib/mapFns/getHomeMap/model'

export default x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(homeModel, x, 'getHomeMap', 'home page source from backend')

    const
        result = {
            nichesList: getNichesList(g(x, 'page', 'TAGS_INFO', 'items'), null, true),
            pornstarsList: getPornstarsList(
                g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
                g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
                null,
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
