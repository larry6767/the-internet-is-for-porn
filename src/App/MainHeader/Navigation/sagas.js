import {put, takeEvery} from 'redux-saga/effects'
import actions from './actions'
import {push} from 'connected-react-router/immutable'

function* togglePage({payload}) {
    yield put(push(payload))
}

export default function* saga() {
    yield takeEvery(actions.setNewPath, togglePage)
}
