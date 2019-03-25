import {plainProvedGet as g} from 'src/App/helpers'
import {getFilteredVideoList, getPageText} from 'ssr/lib/helpers/mapFns'

export default x => {
    return {
        pageNumber: x.page.PAGE_NUMBER,
        pageText: getPageText(x.page.PAGE_TEXT),
        pagesCount: x.page.PAGES_COUNT,
        itemsCount: x.page.ITEMS_PER_PAGE,
        videoList: getFilteredVideoList(
            g(x, 'page', 'GALS_INFO', 'ids'),
            g(x, 'page', 'GALS_INFO', 'items')
        ),
    }
}
