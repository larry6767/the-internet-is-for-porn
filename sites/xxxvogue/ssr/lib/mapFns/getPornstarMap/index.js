import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'

import {
    getPornstarsList,
    getOrderingSortList,
    getFilteredVideoList,
    getPageText,
    getPornstarInfo,
    getPornstarInfoForTable,
    getSponsorsList,
} from 'ssr/lib/helpers/mapFns'

import {pornstarModel, mappedPornstarModel} from 'ssr/lib/mapFns/getPornstarMap/model'

export default x => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(pornstarModel, x, 'getPornstarMap', 'pornstar page source from backend')

    const
        sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS')),

        pornstarInfoForTable = getPornstarInfoForTable(
            g(x, 'page', 'MODEL_INFO'),
            g(x, 'page', 'MONTHS_NAMES'),
        ),

        result = {
            tagId: g(x, 'page', 'TAG_ID'),
            pageNumber: g(x, 'page', 'PAGE_NUMBER'),
            pageText: getPageText(g(x, 'page', 'PAGE_TEXT')),
            pagesCount: g(x, 'page', 'PAGES_COUNT'),

            sortList,
            currentSort:
                g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

            itemsCount: g(x, 'page', 'ITEMS_PER_PAGE'),
            videoList: getFilteredVideoList(
                g(x, 'page', 'GALS_INFO', 'ids'),
                g(x, 'page', 'GALS_INFO', 'items')
            ),
            modelsList: getPornstarsList(
                g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
                g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
                null,
                true
            ),
            pornstarInfo: getPornstarInfo(g(x, 'page', 'MODEL_INFO')),
            pornstarInfoForTable: g(pornstarInfoForTable, 'data'),
            pornstarInfoForTableKeysOrder: g(pornstarInfoForTable, 'keysOrder'),
            sponsorsList: getSponsorsList(g(x, 'page', 'CUSTOM_DATA', 'galsFacets', 'sponsor')),
            currentSponsor: g(x, 'page', 'SPONSOR_URL_NAME'),
        }

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            mappedPornstarModel,
            result,
            'getPornstarMap',
            'mapped pornstar page data'
        )

    return result
}
