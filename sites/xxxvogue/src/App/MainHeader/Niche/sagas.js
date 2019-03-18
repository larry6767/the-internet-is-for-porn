import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

// local libs
import {plainProvedGet as g, getRouterContext} from 'src/App/helpers'
import routerGetters from 'src/App/routerGetters'
import actions from 'src/App/MainHeader/Niche/actions'

function* switchOrientationFlow(action) {
    const
        routerContext = yield select(x => getRouterContext(x))

    yield put(push(routerGetters.home.link(
        routerContext.set('currentOrientation', g(action, 'payload'))
    )))
}

export default function* saga() {
    yield takeEvery(g(actions, 'switchOrientation'), switchOrientationFlow)
}
