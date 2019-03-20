import {pick, map} from 'lodash'

// local libs
import {getPageText} from 'ssr/lib/helpers/mapFns'

export default x => {
    return {
        pageNumber: x.page.PAGE_NUMBER,
        pageText: getPageText(x.page.PAGE_TEXT),
        pagesCount: x.page.PAGES_COUNT,
        itemsCount: x.page.ITEMS_PER_PAGE,
        modelsList: map(
            pick(
                x.page.MODELS_BY_LETTERS_TAGS_INFO,
                (Object.keys(x.page.MODELS_INFO.items))
            ),
            ({id, name, sub_url, items_count}) => ({
                id: Number(id),
                name,
                subPage: sub_url,
                itemsCount: Number(items_count),
                thumb: x.page.MODELS_BY_LETTERS_MODELS_INFO.items[id].thumb_url,
            })
        )
    }
}
