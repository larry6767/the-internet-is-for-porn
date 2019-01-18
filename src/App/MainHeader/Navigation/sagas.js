import {put, takeEvery} from 'redux-saga/effects'
import {push} from 'connected-react-router/immutable'

import {plainProvedGet as g} from '../../helpers'
import actions from './actions'

function* switchPageFlow(action) {
    yield put(push(g(action, 'payload')))
}

export default function* saga() {
    yield takeEvery(actions.setNewPath, switchPageFlow)
}
