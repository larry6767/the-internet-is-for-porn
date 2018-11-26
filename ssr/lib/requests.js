import _, {
    map,
    reduce,
    set,
    assign,
    pick,
    sortBy,
    toPairs,
    values,
} from 'lodash'
import rp from 'request-promise-native'

import {backendUrl} from '../config'

const
    getAllNichesMap = x => map(
        x.page.TAGS_INFO.items,
        ({id, name, sub_url, items_count}) => ({
            id,
            name,
            subPage: sub_url,
            itemsCount: items_count,
        })
    ),

    getNicheMap = x => {
        const
            sortList = map(
                pick(
                    x.page.ACTIVE_NAV_TABS,
                    ['sort_LATEST', 'sort_LONGEST', 'sort_POPULAR']
                ),
                ({ACTIVE}, key) => {
                    key = key.slice(key.indexOf('_') + 1).toLowerCase()
                    return {
                        active: ACTIVE,
                        value: key,
                        localText: getLocalText(x.page.LANG_ID, key),
                    }
                }
            ),
            idsOrdering = x.page.GALS_INFO.ids,
            orderedVideoList = sortBy(
                x.page.GALS_INFO.items,
                ({id}) => idsOrdering.indexOf(Number(id))
            )

        return {
            pageUrl: x.page.PAGE_URL,
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
            tagList: map(
                reduce(
                    x.page.TAGS_BY_LETTERS.letters,
                    (tagList, letter) => assign(tagList, letter)
                ),
                ({id, name, sub_url, items_count}) => ({
                    id,
                    name,
                    subPage: sub_url,
                    itemsCount: items_count,
                })
            ),
            tagArchiveList: map(
                x.page.TAG_ARCHIVE_LIST_FULL,
                ({archive_date, items_count, month, url, year}) => ({
                    archiveDate: archive_date,
                    itemsCount: items_count,
                    month: x.page.MONTHS_NAMES[Number(month) < 10 ? month.slice(1) : month],
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
            itemsCount: x.page.ITEMS_COUNT,
            videosList: map(
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

    getLocalText = (languageId, key) => {
        switch (languageId) {
            case 'eng':
                return key === 'latest'
                    ? 'Recent'
                    : key === 'longest'
                    ? 'Duration'
                    : key === 'popular'
                    ? 'Popularity'
                    : undefined
        }
    }

// sort of enum (to reduce human-factor mistakes).
// required suffix: `PageCode`.
export const
    allNichesPageCode = 'all-niches',
    nichePageCode = 'niche'

export const getPageData = async ({headers, pageCode, subPageCode}) => {
    const
        [params, mapFn] =
            pageCode === allNichesPageCode
            ? [{url: '/?categories'}, getAllNichesMap]
            : pageCode === nichePageCode
            ? [{url: `/${subPageCode}.html`, options: {blocks: {allTagsBlock: 1}}}, getNicheMap]
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
