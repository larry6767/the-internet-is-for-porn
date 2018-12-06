import _, {
    map,
    pick,
    sortBy,
} from 'lodash'
import rp from 'request-promise-native'
import {
    getTagList,
    getModelsList,
    getSortList,
} from './helpers/requests'
import {backendUrl} from '../config'

const
    // TODO FIXME: now i'm not shure about getting this data,
    // because on production we have some additional tags(i don't know yet where i should get it)
    // if we'll leave this implementation we need some additional logic,
    // because it's same data for AllNiches and Niche (we don't need to get twice from API)
    getAllNichesMap = x => getTagList(x.page.TAGS_BY_LETTERS.letters),
    // sortBy(
    //     map(
    //         x.page.TAGS_INFO.items,
    //         ({id, name, sub_url, items_count}) => ({
    //             id,
    //             name,
    //             subPage: sub_url,
    //             itemsCount: items_count,
    //         })
    //     ),
    //     o => o.name
    // ),

    getAllMoviesMap = x => {
        const
            sortList = getSortList(x.page.ACTIVE_NAV_TABS, x.page.LANG_ID),
            // Just on `Niche` page it's `Array` but on archive page it's `Object`.
            idsOrdering =
                Array.isArray(x.page.GALS_INFO.ids)
                ? x.page.GALS_INFO.ids
                : _(x.page.GALS_INFO.ids).toPairs().sortBy(0).map(([k, v]) => Number(v)).value(),

            orderedVideoList = sortBy(
                x.page.GALS_INFO.items,
                ({id}) => idsOrdering.indexOf(Number(id))
            )

        return {
            currentPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pageText: {
                description: x.page.PAGE_TEXT.DESCRIPTION,
                headerDescription: x.page.PAGE_TEXT['HEADER-DESCRIPTION'],
                headerTitle: x.page.PAGE_TEXT['HEADER-TITLE'],
                keywords: x.page.PAGE_TEXT.KEYWORDS,
                listHeader: x.page.PAGE_TEXT['LIST-HEADER'],
                listHeaderEmpty: x.page.PAGE_TEXT['LIST-HEADER-EMPTY'],
                title: x.page.PAGE_TEXT.TITLE,
            },
            pagesCount: x.page.PAGES_COUNT,
            tagList: getTagList(x.page.TAGS_BY_LETTERS.letters),
            tagArchiveList: map(
                x.page.TAG_ARCHIVE_LIST_FULL,
                ({archive_date, items_count, month, url, year}) => ({
                    archiveDate: archive_date,
                    itemsCount: items_count,
                    month: x.page.MONTHS_NAMES[Number(month) < 10 ? month.slice(1) : month],
                    monthNumber: month,
                    url,
                    year,
                })
            ),
            tagArchiveListOlder: pick(
                x.page.TAG_ARCHIVE_OLDER,
                ['month', 'year']
            ),
            tagArchiveListNewer: pick(
                x.page.TAG_ARCHIVE_NEWER,
                ['month', 'year']
            ),
            sortList: sortList,
            currentSort: sortList.length ? sortList.find(x => x.active).value : '',
            archiveFilms: x.page.ACTIVE_NAV_TABS.tag_archive_gals
                ? {
                    current: x.page.ACTIVE_NAV_TABS.tag_archive_gals.ACTIVE,
                    monthForLink: x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL
                        .slice(
                            x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL.lastIndexOf('/') + 1,
                            x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL.lastIndexOf('-archive.html')
                        )
                } : undefined,
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: map(
                orderedVideoList,
                ({id, thumb_url, title, id_sponsor, tags, url_regular, thumb_top, length}) => ({
                    // It's supposed to be a number (not a string, as returned by backend),
                    // because `x.page.GALS_INFO.ids` contains these ids as numbers.
                    id: Number(id),

                    thumb: thumb_url,
                    title,
                    sponsorId: id_sponsor,
                    tags,

                    // This is for very small string under a video preview,
                    // it's usually only one single tag.
                    tagsShort: tags.reduce((acc, tag) => {
                        const newAcc = acc === '' ? tag : `${acc}, ${tag}`
                        return newAcc.length <= 22 ? newAcc : acc
                    }, ''),

                    urlRegular: url_regular,
                    favorite: thumb_top,
                    duration: length,
                })
            )
        }
    },

    getNicheMap = x => {
        const
            sortList = getSortList(x.page.ACTIVE_NAV_TABS, x.page.LANG_ID),
            // Just on `Niche` page it's `Array` but on archive page it's `Object`.
            idsOrdering =
                Array.isArray(x.page.GALS_INFO.ids)
                ? x.page.GALS_INFO.ids
                : _(x.page.GALS_INFO.ids).toPairs().sortBy(0).map(([k, v]) => Number(v)).value(),

            orderedVideoList = sortBy(
                x.page.GALS_INFO.items,
                ({id}) => idsOrdering.indexOf(Number(id))
            )

        return {
            currentPage: 'all-niches',
            currentSubPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pageText: {
                description: x.page.PAGE_TEXT.DESCRIPTION,
                headerDescription: x.page.PAGE_TEXT['HEADER-DESCRIPTION'],
                headerTitle: x.page.PAGE_TEXT['HEADER-TITLE'],
                keywords: x.page.PAGE_TEXT.KEYWORDS,
                listHeader: x.page.PAGE_TEXT['LIST-HEADER'],
                listHeaderEmpty: x.page.PAGE_TEXT['LIST-HEADER-EMPTY'],
                title: x.page.PAGE_TEXT.TITLE,
            },
            pagesCount: x.page.PAGES_COUNT,
            tagList: getTagList(x.page.TAGS_BY_LETTERS.letters),
            tagArchiveList: map(
                x.page.TAG_ARCHIVE_LIST_FULL,
                ({archive_date, items_count, month, url, year}) => ({
                    archiveDate: archive_date,
                    itemsCount: items_count,
                    month: x.page.MONTHS_NAMES[Number(month) < 10 ? month.slice(1) : month],
                    monthNumber: month,
                    url,
                    year,
                })
            ),
            tagArchiveListOlder: pick(
                x.page.TAG_ARCHIVE_OLDER,
                ['month', 'year']
            ),
            tagArchiveListNewer: pick(
                x.page.TAG_ARCHIVE_NEWER,
                ['month', 'year']
            ),
            sortList: sortList,
            currentSort: sortList.length ? sortList.find(x => x.active).value : '',
            archiveFilms: x.page.ACTIVE_NAV_TABS.tag_archive_gals
                ? {
                    current: x.page.ACTIVE_NAV_TABS.tag_archive_gals.ACTIVE,
                    monthForLink: x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL
                        .slice(
                            x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL.lastIndexOf('/') + 1,
                            x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL.lastIndexOf('-archive.html')
                        )
                } : undefined,
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: map(
                orderedVideoList,
                ({id, thumb_url, title, id_sponsor, tags, url_regular, thumb_top, length}) => ({
                    // It's supposed to be a number (not a string, as returned by backend),
                    // because `x.page.GALS_INFO.ids` contains these ids as numbers.
                    id: Number(id),

                    thumb: thumb_url,
                    title,
                    sponsorId: id_sponsor,
                    tags,

                    // This is for very small string under a video preview,
                    // it's usually only one single tag.
                    tagsShort: tags.reduce((acc, tag) => {
                        const newAcc = acc === '' ? tag : `${acc}, ${tag}`
                        return newAcc.length <= 22 ? newAcc : acc
                    }, ''),

                    urlRegular: url_regular,
                    favorite: thumb_top,
                    duration: length,
                })
            )
        }
    },

    getPornstarMap = x => {
        const
            sortList = getSortList(x.page.ACTIVE_NAV_TABS, x.page.LANG_ID),
            // Just on `Niche` page it's `Array` but on archive page it's `Object`.
            idsOrdering =
                Array.isArray(x.page.GALS_INFO.ids)
                ? x.page.GALS_INFO.ids
                : _(x.page.GALS_INFO.ids).toPairs().sortBy(0).map(([k, v]) => Number(v)).value(),

            orderedVideoList = sortBy(
                x.page.GALS_INFO.items,
                ({id}) => idsOrdering.indexOf(Number(id))
            )

        return {
            currentPage: 'all-niches',
            currentSubPage: x.page.TAG_URL_NAME,
            pageNumber: x.page.PAGE_NUMBER,
            pageText: {
                description: x.page.PAGE_TEXT.DESCRIPTION,
                headerDescription: x.page.PAGE_TEXT['HEADER-DESCRIPTION'],
                headerTitle: x.page.PAGE_TEXT['HEADER-TITLE'],
                keywords: x.page.PAGE_TEXT.KEYWORDS,
                listHeader: x.page.PAGE_TEXT['LIST-HEADER'],
                listHeaderEmpty: x.page.PAGE_TEXT['LIST-HEADER-EMPTY'],
                title: x.page.PAGE_TEXT.TITLE,
            },
            pagesCount: x.page.PAGES_COUNT,
            tagList: getTagList(x.page.TAGS_BY_LETTERS.letters),
            tagArchiveList: map(
                x.page.TAG_ARCHIVE_LIST_FULL,
                ({archive_date, items_count, month, url, year}) => ({
                    archiveDate: archive_date,
                    itemsCount: items_count,
                    month: x.page.MONTHS_NAMES[Number(month) < 10 ? month.slice(1) : month],
                    monthNumber: month,
                    url,
                    year,
                })
            ),
            tagArchiveListOlder: pick(
                x.page.TAG_ARCHIVE_OLDER,
                ['month', 'year']
            ),
            tagArchiveListNewer: pick(
                x.page.TAG_ARCHIVE_NEWER,
                ['month', 'year']
            ),
            sortList: sortList,
            currentSort: sortList.length ? sortList.find(x => x.active).value : '',
            archiveFilms: x.page.ACTIVE_NAV_TABS.tag_archive_gals
                ? {
                    current: x.page.ACTIVE_NAV_TABS.tag_archive_gals.ACTIVE,
                    monthForLink: x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL
                        .slice(
                            x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL.lastIndexOf('/') + 1,
                            x.page.ACTIVE_NAV_TABS.tag_archive_gals.URL.lastIndexOf('-archive.html')
                        )
                } : undefined,
            itemsCount: x.page.ITEMS_PER_PAGE,
            videoList: map(
                orderedVideoList,
                ({id, thumb_url, title, id_sponsor, tags, url_regular, thumb_top, length}) => ({
                    // It's supposed to be a number (not a string, as returned by backend),
                    // because `x.page.GALS_INFO.ids` contains these ids as numbers.
                    id: Number(id),

                    thumb: thumb_url,
                    title,
                    sponsorId: id_sponsor,
                    tags,

                    // This is for very small string under a video preview,
                    // it's usually only one single tag.
                    tagsShort: tags.reduce((acc, tag) => {
                        const newAcc = acc === '' ? tag : `${acc}, ${tag}`
                        return newAcc.length <= 22 ? newAcc : acc
                    }, ''),

                    urlRegular: url_regular,
                    favorite: thumb_top,
                    duration: length,
                })
            )
        }
    },

    getPornstarsMap = x => {
        return getModelsList(x.page.MODELS_BY_LETTERS.letters, x.page.MODELS_BY_LETTERS_MODELS_INFO.items)
    }

// sort of enum (to reduce human-factor mistakes).
// required suffix: `PageCode`.
export const
    allNichesPageCode = 'all-niches',
    nichePageCode = 'niche',
    allMoviesPageCode = 'all-movies',
    pornstarsPageCode = 'porn-stars',
    pornstarPageCode = 'porn-star'

export const getPageData = async ({headers, pageCode, subPageCode}) => {
    const
        [params, mapFn] =
            pageCode === allNichesPageCode
            ? [{url: '/?categories', options: {blocks: {allTagsBlock: 1}}}, getAllNichesMap]
            : pageCode === nichePageCode
            ? [{url: `/${subPageCode}.html`, options: {blocks: {allTagsBlock: 1}}}, getNicheMap]
            : pageCode === allMoviesPageCode
            ? [{url: `/${pageCode}${subPageCode}.html`, options: {blocks: {allTagsBlock: 1}}}, getAllMoviesMap]
            : pageCode === pornstarsPageCode
            ? [{url: `/${pageCode}.html`}, getPornstarsMap]
            : pageCode === pornstarPageCode
            ? [{url: `/${subPageCode}.html`, options: {blocks: {allTagsBlock: 1}}}, getPornstarMap]
            : null

    if (params === null)
        throw new Error(`Unexpected page code: "${pageCode}"`)

    return mapFn(await rp({
        uri: backendUrl,
        method: 'POST',
        headers,
        json: true,
        body: {operation: 'getPageDataByUrl', params},
    }))
}
