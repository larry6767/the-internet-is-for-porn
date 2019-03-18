import {all} from 'redux-saga/effects'

// local libs
import navigationSaga from 'src/App/MainHeader/Navigation/sagas'
import languageSaga from 'src/App/MainHeader/Language/sagas'
import searchSaga from 'src/App/MainHeader/Search/sagas'
import nicheSaga from 'src/App/MainHeader/Niche/sagas'

export default function* saga() {
    yield all([
        navigationSaga(),
        languageSaga(),
        searchSaga(),
        nicheSaga(),
    ])
}
