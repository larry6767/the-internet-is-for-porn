import mainHeaderSaga from './MainHeader/sagas'
import allMoviesSaga from './AllMovies/sagas'
import allNichesSaga from './AllNiches/sagas'

export default function* saga() {
    yield [
        mainHeaderSaga(),
        allNichesSaga(),
        allMoviesSaga(),
    ]
}
