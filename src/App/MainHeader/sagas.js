import navigationSaga from './Navigation/sagas'
import languageSaga from './Language/sagas'

export default function* saga() {
    yield [
        navigationSaga(),
        languageSaga(),
    ]
}
