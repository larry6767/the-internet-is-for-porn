import {all} from 'redux-saga/effects'

import navigationSaga from './Navigation/sagas'
import languageSaga from './Language/sagas'
import searchSaga from './Search/sagas'
import nicheSaga from './Niche/sagas'

export default function* saga() {
    yield all([
        navigationSaga(),
        languageSaga(),
        searchSaga(),
        nicheSaga(),
    ])
}
