import navigationSaga from './Navigation/sagas'

export default function* saga() {
    yield [
        navigationSaga()
    ]
}
