import {map, reverse, reduce, set, assign} from 'lodash'
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

    getNicheMap = x => ({
        pageUrl: x.page.PAGE_URL,
        pageNumber: x.page.PAGE_NUMBER,
        pageText: {
            description: x.page.PAGE_TEXT.DESCRIPTION,
            headerDescription: x.page.PAGE_TEXT['HEADER-DESCRIPTION'],
            headerTitle: x.page.PAGE_TEXT['HEADER-TITLE'],
            keywords: x.page.PAGE_TEXT.KEYWORDS,
            listHeader: x.page.PAGE_TEXT['LIST-HEADER'],
            listHeaderEmpty: x.page.PAGE_TEXT['LIST-HEADER-EMPTY'],
            title: x.page.PAGE_TEXT.TITLE
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
        tagArchiveList: reverse(map(
            x.page.TAG_ARCHIVE_LIST_FULL,
            ({archive_date, items_count, month, url, year}) => ({
                archiveDate: archive_date,
                itemsCount: items_count,
                month: x.page.MONTHS_NAMES[Number(month) < 10 ? month.slice(1) : month],
                url,
                year,
            })
        )),
    }),

    // sort of enum (to reduce human-factor mistakes).
    // required suffix: `PageCode`.
    allNichesPageCode = 'all-niches',
    nichePageCode = 'niche'

export const getPageData = async ({headers, pageCode, pageSubCode}) => {
    const
        [params, mapFn] =
            pageCode === allNichesPageCode
            ? [{url: '/?categories'}, getAllNichesMap]
            : pageCode === nichePageCode
            ? [{url: `/${pageSubCode}.html`, options: {blocks: {allTagsBlock: 1}}}, getNicheMap]
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
