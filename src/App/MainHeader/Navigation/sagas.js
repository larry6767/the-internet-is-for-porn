import {put, takeEvery} from 'redux-saga/effects'
import actions from './actions'
import {push} from 'connected-react-router/immutable'

function* switchPageFlow({payload}) {
    yield put(push(payload))
}

export default function* saga() {
    yield takeEvery(actions.setNewPath, switchPageFlow)
}
