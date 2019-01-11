import navigationSaga from './Navigation/sagas'
import languageSaga from './Language/sagas'
import searchSaga from './Search/sagas'

export default function* saga() {
    yield [
        navigationSaga(),
        languageSaga(),
        searchSaga(),
    ]
}
