import {put, takeEvery, select} from 'redux-saga/effects'

// local libs
import {
    obtainPageData,
    plainProvedGet as g,
    immutableProvedGet as ig,
    getRandomWidthList,
} from 'src/App/helpers'
import errorActions from 'src/generic/ErrorMessage/actions'
import actions from 'src/App/Home/actions'

export function* loadHomeFlow(action, ssrContext) {
    try {
        const
            isSSR = yield select(x => ig(x, 'app', 'ssr', 'isSSR')),
            pageRequestParams = g(action, 'payload', 'pageRequestParams'),
            data = yield obtainPageData(ssrContext, 'home', pageRequestParams)

        if (isSSR) {
            const
                randomWidthList = getRandomWidthList(g(data, 'nichesListWithThumb', 'length'))
            yield put(actions.setRandomWidthList({randomWidthList}))
        }

        yield put(actions.loadPageSuccess({pageRequestParams, data}))
    } catch (err) {
        console.error('loadHomeFlow is failed with exception:', err)
        yield put(actions.loadPageFailure())
        yield put(errorActions.openErrorMessage())
    }
}

export default function* saga() {
    yield takeEvery(actions.loadPageRequest, loadHomeFlow)
}
