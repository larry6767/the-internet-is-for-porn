import {pick, get} from 'lodash'

// local libs
import {plainProvedGet as g} from 'src/App/helpers'

import {
    getNichesListByLetters,
    getOrderingSortList,
    getFilteredVideoList,
    getPageText,
    getTagArchiveList,
    getArchiveFilms,
    getSponsorsList,
} from 'ssr/lib/helpers/mapFns'


export default x => {
    const
        sortList = getOrderingSortList(g(x, 'page', 'ACTIVE_NAV_TABS')),
        tagArchiveListOlder = pick(g(x, 'page').TAG_ARCHIVE_OLDER, ['month', 'year']),
        tagArchiveListNewer = pick(g(x, 'page').TAG_ARCHIVE_NEWER, ['month', 'year']),
        archiveFilms = get(g(x, 'page', 'ACTIVE_NAV_TABS'), ['tag_archive_gals'], null)

    return {
        tagId: g(x, 'page', 'TAG_ID'),
        currentPage: x.page.TAG_URL_NAME,
        pageNumber: x.page.PAGE_NUMBER,
        pagesCount: x.page.PAGES_COUNT,
        pageText: getPageText(x.page.PAGE_TEXT),
        sponsorsList: getSponsorsList(g(x, 'page', 'CUSTOM_DATA', 'searchSponsors')),
        tagList: getNichesListByLetters(x.page.TAGS_BY_LETTERS.letters),

        tagArchiveList: getTagArchiveList(
            get(g(x, 'page'), ['TAG_ARCHIVE_LIST_FULL'], g(x, 'page', 'TAG_ARCHIVE_LIST')),
            g(x, 'page', 'MONTHS_NAMES')
        ),

        tagArchiveListOlder:
            tagArchiveListOlder && Object.keys(tagArchiveListOlder).length
                ? tagArchiveListOlder
                : null,

        tagArchiveListNewer:
            tagArchiveListNewer && Object.keys(tagArchiveListNewer).length
                ? tagArchiveListNewer
                : null,

        sortList,
        currentSort:
            g(sortList, 'length') ? g(sortList.find(x => g(x, 'isActive')), 'code') : null,

        archiveFilms: archiveFilms && getArchiveFilms(archiveFilms),
        itemsCount: x.page.ITEMS_PER_PAGE,
        videoList: getFilteredVideoList(
            g(x, 'page', 'GALS_INFO', 'ids'),
            g(x, 'page', 'GALS_INFO', 'items')
        ),
    }
}
