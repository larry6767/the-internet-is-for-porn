import homeSaga from './Home/sagas'
import mainHeaderSaga from './MainHeader/sagas'
import allMoviesSaga from './AllMovies/sagas'
import allNichesSaga from './AllNiches/sagas'
import pornstarsSaga from './Pornstars/sagas'
import favoriteSaga from './Favorite/sagas'

export default function* saga() {
    yield [
        homeSaga(),
        mainHeaderSaga(),
        allNichesSaga(),
        allMoviesSaga(),
        pornstarsSaga(),
        favoriteSaga(),
    ]
}
