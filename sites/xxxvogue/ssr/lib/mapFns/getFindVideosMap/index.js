import {plainProvedGet as g} from 'src/App/helpers'

import {
    getOrderingSortList,
    getFilteredVideoList,
    getPageText,
    getSponsorsList,
} from 'ssr/lib/helpers/mapFns'

export default x => {
    const
        sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS')),
        orientationSuggestion = ! (
            x.page.SEARCH_SUGGESTED_CLASS_ID &&
            x.page.SEARCH_SUGGESTED_CLASS_ID !== g(x, 'page', 'CLASS_ID')
        ) ? null :
            Number(g(x, 'page', 'SEARCH_SUGGESTED_CLASS_ID'))

    return {
        orientationSuggestion,
        pageNumber: g(x, 'page', 'PAGE_NUMBER'),
        pageText: getPageText(g(x, 'page', 'PAGE_TEXT')),
        pagesCount: g(x, 'page', 'PAGES_COUNT'),
        sponsorsList: getSponsorsList(g(x, 'page', 'CUSTOM_DATA', 'searchSponsors')),

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
