import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'

// local libs
import {provedHandleActions, plainProvedGet as g} from 'src/App/helpers'

import actions from 'src/App/MainHeader/actions'

import nicheReducer from 'src/App/MainHeader/Niche/reducers'
import languageReducer from 'src/App/MainHeader/Language/reducers'
import HDSwitchReducer from 'src/App/MainHeader/HDSwitch/reducers'
import navigationReducer from 'src/App/MainHeader/Navigation/reducers'
import searchReducer from 'src/App/MainHeader/Search/reducers'
import burgerMenuReducer from 'src/App/MainHeader/BurgerMenu/reducers'
import {model} from 'src/App/MainHeader/models'

export default combineReducers({
    niche: nicheReducer,
    language: languageReducer,
    HDSwitch: HDSwitchReducer,
    navigation: navigationReducer,
    search: searchReducer,
    burgerMenu: burgerMenuReducer,

    ui: provedHandleActions(model, {
        [g(actions, 'toggleSearch')]: state =>
            state.set('isSearchShown', !state.get('isSearchShown')),
    }, fromJS({
        isSearchShown: false,
    }))
})
