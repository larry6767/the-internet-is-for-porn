import {plainProvedGet as g} from 'src/App/helpers'
import {getModelsList, getPageText} from 'ssr/lib/helpers/mapFns'

export default x => ({
    modelsList: getModelsList(
        g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
        g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items')
    ),
    pageText: getPageText(x.page.PAGE_TEXT),
})
