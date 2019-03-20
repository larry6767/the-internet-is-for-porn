import {plainProvedGet as g} from 'src/App/helpers'

import {
    getOrderingSortList,
    getFilteredVideoList,
    getPageText
} from 'ssr/lib/helpers/mapFns'

export default x => {
    const
        sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS'))

    return {
        pageNumber: x.page.PAGE_NUMBER,
        pageText: getPageText(x.page.PAGE_TEXT),
        pagesCount: x.page.PAGES_COUNT,

        sortList,
        currentSort:
            g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

        itemsCount: x.page.ITEMS_PER_PAGE,
        videoList: getFilteredVideoList(
            g(x, 'page', 'GALS_INFO', 'ids'),
            g(x, 'page', 'GALS_INFO', 'items')
        ),
    }
}
