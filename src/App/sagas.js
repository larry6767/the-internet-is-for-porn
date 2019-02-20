import {all, takeEvery, put} from 'redux-saga/effects'
import {LOCATION_CHANGE} from 'connected-react-router'

import homeSaga from './Home/sagas'
import mainHeaderSaga from './MainHeader/sagas'
import allMoviesSaga from './AllMovies/sagas'
import allNichesSaga from './AllNiches/sagas'
import pornstarsSaga from './Pornstars/sagas'
import favoriteSaga from './Favorite/sagas'
import favoritePornstarsSaga from './FavoritePornstars/sagas'
import videoPageSaga from './VideoPage/sagas'
import findVideosSaga from './FindVideos/sagas'
import siteSaga from './Site/sagas'
import notFoundSaga from './NotFound/sagas'
import reportDialogSaga from './ReportDialog/sagas'

import {
    getIdsForInitialFavoriteList,
    addIdToCookie,
    removeIdFromCookie,
    immutableProvedGet as ig,
} from './helpers'

import actions from './actions'
import favoriteActions from './Favorite/actions'
import favoritePornstarsActions from './FavoritePornstars/actions'

export function* addVideoToFavorite({payload: item}) {
    addIdToCookie('mcj_fav', item)
    yield put(actions.addVideoIdToFavorite(ig(item, 'id')))
    yield put(favoriteActions.addToList(item))
}

export function* removeVideoFromFavorite({payload: id}) {
    removeIdFromCookie('mcj_fav', id)
    yield put(actions.removeVideoIdFromFavorite(id))
    yield put(favoriteActions.removeFromList(id))
}

export function* getFavoriteVideoList(action, ssrContext) {
    yield put(actions.setFavoriteVideoList(getIdsForInitialFavoriteList('mcj_fav')))
}

export function* addPornstarToFavorite({payload: item}) {
    addIdToCookie('mcj_fav_model', item)
    yield put(actions.addPornstarIdToFavorite(ig(item, 'id')))
    yield put(favoritePornstarsActions.addToList(item))
}

export function* removePornstarFromFavorite({payload: id}) {
    removeIdFromCookie('mcj_fav_model', id)
    yield put(actions.removePornstarIdFromFavorite(id))
    yield put(favoritePornstarsActions.removeFromList(id))
}

export function* getFavoritePornstarList(action, ssrContext) {
    yield put(actions.setFavoritePornstarList(getIdsForInitialFavoriteList('mcj_fav_model')))
}

function scrollToTop() {
    window.scrollTo(0, 0)
}

export default function* saga() {
    yield takeEvery(actions.getFavoriteVideoList, getFavoriteVideoList)
    yield takeEvery(actions.removeVideoFromFavorite, removeVideoFromFavorite)
    yield takeEvery(actions.addVideoToFavorite, addVideoToFavorite)
    yield takeEvery(actions.getFavoritePornstarList, getFavoritePornstarList)
    yield takeEvery(actions.removePornstarFromFavorite, removePornstarFromFavorite)
    yield takeEvery(actions.addPornstarToFavorite, addPornstarToFavorite)
    yield takeEvery(LOCATION_CHANGE, scrollToTop)

    yield all([
        homeSaga(),
        mainHeaderSaga(),
        allNichesSaga(),
        allMoviesSaga(),
        pornstarsSaga(),
        favoriteSaga(),
        favoritePornstarsSaga(),
        videoPageSaga(),
        findVideosSaga(),
        siteSaga(),
        notFoundSaga(),
        reportDialogSaga(),
    ])
}
