import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'

import {
    getModelsList,
    getOrderingSortList,
    getFilteredVideoList,
    getPageText,
    getPornstarInfo,
    getPornstarInfoForTable,
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
            modelsList: getModelsList(
                g(x, 'page', 'MODELS_BY_LETTERS', 'letters'),
                g(x, 'page', 'MODELS_BY_LETTERS_MODELS_INFO', 'items'),
                true
            ),
            pornstarInfo: getPornstarInfo(g(x, 'page', 'MODEL_INFO')),
            pornstarInfoForTable: g(pornstarInfoForTable, 'data'),
            pornstarInfoForTableKeysOrder: g(pornstarInfoForTable, 'keysOrder'),
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
