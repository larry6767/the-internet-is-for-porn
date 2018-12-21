import {takeEvery, put} from 'redux-saga/effects'
import {replace} from 'lodash'

import homeSaga from './Home/sagas'
import mainHeaderSaga from './MainHeader/sagas'
import allMoviesSaga from './AllMovies/sagas'
import allNichesSaga from './AllNiches/sagas'
import pornstarsSaga from './Pornstars/sagas'
import favoriteSaga from './Favorite/sagas'
import favoritePornstarsSaga from './FavoritePornstars/sagas'
import {
    getCookie,
    deleteCookie,
    setCookie,
    getIdsForInitialFavoriteList,
} from './helpers'
import actions from './actions'
import favoriteActions from './Favorite/actions'
import favoritePornstarsActions from './FavoritePornstars/actions'

export function* addVideoToFavorite({payload: item}) {
    const
        currentCookie = getCookie('mcj_fav'),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${item.get('id')}F`

    setCookie('mcj_fav', nextCookie, 3600 * 24 * 365 * 20)

    yield put(actions.addToFavoriteVideoList(item.get('id')))
    yield put(favoriteActions.addToList(item))
}

export function* removeVideoFromFavorite({payload: id}) {
    const
        currentCookie = getCookie('mcj_fav'),
        nextCookie = replace(currentCookie, `${id}F`, '')

    if (nextCookie === 'F')
        deleteCookie('mcj_fav')
    else
        setCookie('mcj_fav', nextCookie, 3600 * 24 * 365 * 20)

    yield put(actions.removeFromFavoriteVideoList(id))
    yield put(favoriteActions.removeFromList(id))
}

export function* getFavoriteVideoList(action, ssrContext) {
    yield put(actions.setFavoriteVideoList(getIdsForInitialFavoriteList('mcj_fav')))
}

export function* addPornstarToFavorite({payload: item}) {
    const
        currentCookie = getCookie('mcj_fav_model'),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${item.get('id')}F`

    setCookie('mcj_fav_model', nextCookie, 3600 * 24 * 365 * 20)

    yield put(actions.addToFavoritePornstarList(item.get('id')))
    yield put(favoritePornstarsActions.addToList(item))
}

export function* removePornstarFromFavorite({payload: id}) {
    const
        currentCookie = getCookie('mcj_fav_model'),
        nextCookie = replace(currentCookie, `${id}F`, '')

    if (nextCookie === 'F')
        deleteCookie('mcj_fav_model')
    else
        setCookie('mcj_fav_model', nextCookie, 3600 * 24 * 365 * 20)

    yield put(actions.removeFromFavoritePornstarList(id))
    yield put(favoritePornstarsActions.removeFromList(id))
}

export function* getFavoritePornstarList(action, ssrContext) {
    yield put(actions.setFavoritePornstarList(getIdsForInitialFavoriteList('mcj_fav_model')))
}

export default function* saga() {
    yield takeEvery(actions.getFavoriteVideoList, getFavoriteVideoList)
    yield takeEvery(actions.removeVideoFromFavorite, removeVideoFromFavorite)
    yield takeEvery(actions.addVideoToFavorite, addVideoToFavorite)
    yield takeEvery(actions.getFavoritePornstarList, getFavoritePornstarList)
    yield takeEvery(actions.removePornstarFromFavorite, removePornstarFromFavorite)
    yield takeEvery(actions.addPornstarToFavorite, addPornstarToFavorite)
    yield [
        homeSaga(),
        mainHeaderSaga(),
        allNichesSaga(),
        allMoviesSaga(),
        pornstarsSaga(),
        favoriteSaga(),
        favoritePornstarsSaga(),
    ]
}
