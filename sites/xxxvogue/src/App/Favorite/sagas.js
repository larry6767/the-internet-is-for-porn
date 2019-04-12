import {put, takeEvery, select} from 'redux-saga/effects'

// local libs
import {
    obtainPageData,
    getRandomWidthList,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from 'src/App/helpers'

import errorActions from 'src/generic/ErrorMessage/actions'
import actions from 'src/App/Favorite/actions'

export function* loadFavoritePageFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'favorite', pageRequestParams)

        if (isSSR) {
            const
                randomWidthList = getRandomWidthList(g(data, 'nichesListWithThumb', 'length'))
            yield put(actions.setRandomWidthList({randomWidthList}))
        }

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadFavoritePageFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadFavoritePageFlow)
}
