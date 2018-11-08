import {put, takeEvery} from 'redux-saga/effects'
import {types} from './actions'
import {push} from 'connected-react-router/immutable'
import {navigation} from './fixtures'


function* togglePage(action) {
    const urlList = Object.keys(navigation)
    yield put(push(urlList[action.payload]))
}

export default function* saga() {
	yield takeEvery(types.TOGGLE_NAVIGATION, togglePage)
}
