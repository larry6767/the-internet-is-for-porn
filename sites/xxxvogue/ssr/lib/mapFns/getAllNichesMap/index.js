import {getNichesListByLetters, getPageText} from 'ssr/lib/helpers/mapFns'

// TODO FIXME: now i'm not shure about getting this data,
// because on production we have some additional tags(i don't know yet where i should get it)
// if we'll leave this implementation we need some additional logic,
// because it's same data for AllNiches and Niche (we don't need to get twice from API)
export default x => ({
    tagList: getNichesListByLetters(x.page.TAGS_BY_LETTERS.letters),
    pageText: getPageText(x.page.PAGE_TEXT),
})
