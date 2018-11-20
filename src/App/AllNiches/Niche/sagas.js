import {map, reverse, pick, reduce, assign} from "lodash"
import {put, takeEvery} from 'redux-saga/effects'
import actions from './actions'
import errorActions from '../../../generic/ErrorMessage/actions'

function* loadPageFlow({payload}) {
    const
        requestUrl = `${payload.slice(payload.lastIndexOf('/'))}.html`

    try {
        const response = yield fetch('/react', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                operation: 'getPageDataByUrl',
                params: {
                    'url': requestUrl,
                    'options': {
                        'blocks': {
                            'allTagsBlock': 1
                        }
                    }
                }
            }),
        })

        if (response.status !== 200)
            throw new Error(`Response status is ${response.status} (not 200)`)

        const
            json = yield response.json(),
            data = {
                lastRoute: payload,
                pageUrl: json.page.PAGE_URL,
                pageNumber: json.page.PAGE_NUMBER,
                pageText: {
                    description: json.page.PAGE_TEXT.DESCRIPTION,
                    headerDescription: json.page.PAGE_TEXT['HEADER-DESCRIPTION'],
                    headerTitle: json.page.PAGE_TEXT['HEADER-TITLE'],
                    keywords: json.page.PAGE_TEXT.KEYWORDS,
                    listHeader: json.page.PAGE_TEXT['LIST-HEADER'],
                    listHeaderEmpty: json.page.PAGE_TEXT['LIST-HEADER-EMPTY'],
                    title: json.page.PAGE_TEXT.TITLE
                },
                pagesCount: json.page.PAGES_COUNT,
                tagList: map(
                    reduce(json.page.TAGS_BY_LETTERS.letters, (tagList, letter) =>
                        assign(tagList, letter)),
                    x => pick(x, ['id', 'name', 'sub_url', 'items_count'])
                ),
            }

        data.tagArchiveList = reverse(map(json.page.TAG_ARCHIVE_LIST_FULL, x => {
            x.month = json.page.MONTHS_NAMES[Number(x.month) < 10
                ? x.month.slice(1)
                : x.month
            ]
            return x
        }))

        console.log('data: ', data)

        yield put(actions.loadPageSuccess(data))
    } catch (err) {
        console.error('loadPageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadPageFlow)
}
