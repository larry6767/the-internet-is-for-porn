import {plainProvedGet as g} from 'src/App/helpers'
import {getPornstarsList, getPageText} from 'ssr/lib/helpers/mapFns'

export default x => ({
    modelsList: getPornstarsList(
        g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
        g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
    ),
    pageText: getPageText(x.page.PAGE_TEXT),
})
