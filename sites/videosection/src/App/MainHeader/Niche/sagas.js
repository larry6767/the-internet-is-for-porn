import {put, takeEvery, select} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {plainProvedGet as g, getRouterContext} from '../../helpers'
import routerGetters from '../../routerGetters'
import actions from './actions'

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