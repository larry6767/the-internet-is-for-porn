import mainHeaderSaga from './MainHeader/sagas'

export default function* saga() {
	yield [
		mainHeaderSaga()
	]
}
