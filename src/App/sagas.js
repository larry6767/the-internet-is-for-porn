import {takeEvery, put} from 'redux-saga/effects'
import {
    compact,
    replace,
    map,
} from 'lodash'

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
    setCookie
} from './helpers'
import actions from './actions'
import favoriteActions from './Favorite/actions'
import favoritePornstarsActions from './FavoritePornstars/actions'

export function* addVideoToFavorite({payload: video}) {
    const
        currentCookie = getCookie('mcj_fav'),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${video.get('id')}F`

    setCookie('mcj_fav', nextCookie, 3600 * 24 * 365 * 20)

    yield put(actions.addToFavoriteVideoList(video.get('id')))
    yield put(favoriteActions.addVideo(video))
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
    yield put(favoriteActions.removeVideo(id))
}

export function* getFavoriteVideoList(action, ssrContext) {
    const
        favoriteVideoList = getCookie('mcj_fav')
            ? map(
                compact(getCookie('mcj_fav').split('F')),
                x => Number(x)
            )
            : []

    yield put(actions.setFavoriteVideoList(favoriteVideoList))
}

export function* addPornstarToFavorite({payload: pornstar}) {
    const
        currentCookie = getCookie('mcj_fav_model'),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${pornstar.get('id')}F`

    setCookie('mcj_fav_model', nextCookie, 3600 * 24 * 365 * 20)

    yield put(actions.addToFavoritePornstarList(Number(pornstar.get('id'))))
    yield put(favoritePornstarsActions.addPornstar(pornstar))
}

export function* removePornstarFromFavorite({payload: id}) {
    const
        currentCookie = getCookie('mcj_fav_model'),
        nextCookie = replace(currentCookie, `${Number(id)}F`, '')

    if (nextCookie === 'F')
        deleteCookie('mcj_fav_model')
    else
        setCookie('mcj_fav_model', nextCookie, 3600 * 24 * 365 * 20)

    yield put(actions.removeFromFavoritePornstarList(Number(id)))
    yield put(favoritePornstarsActions.removePornstar(Number(id)))
}

export function* getFavoritePornstarList(action, ssrContext) {
    const
        favoritePornstarList = getCookie('mcj_fav_model')
            ? map(
                compact(getCookie('mcj_fav_model').split('F')),
                x => Number(x)
            )
            : []

    yield put(actions.setFavoritePornstarList(favoritePornstarList))
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
