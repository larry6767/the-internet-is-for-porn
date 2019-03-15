import {put, takeEvery} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

// local libs
import {plainProvedGet as g} from 'src/App/helpers'
import actions from 'src/App/MainHeader/Navigation/actions'

function* switchPageFlow(action) {
    yield put(push(g(action, 'payload')))
}

export default function* saga() {
    yield takeEvery(actions.setNewPath, switchPageFlow)
}
