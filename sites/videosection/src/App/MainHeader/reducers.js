import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'

// local libs
import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g
} from 'src/App/helpers'

import actions from 'src/App/MainHeader/actions'

import nicheReducer from 'src/App/MainHeader/Niche/reducers'
import languageReducer from 'src/App/MainHeader/Language/reducers'
import HDSwitchReducer from 'src/App/MainHeader/HDSwitch/reducers'
import navigationReducer from 'src/App/MainHeader/Navigation/reducers'
import searchReducer from 'src/App/MainHeader/Search/reducers'
import burgerMenuReducer from 'src/App/MainHeader/BurgerMenu/reducers'

const
    mainHeaderUiModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isSearchShown: PropTypes.bool,
        title: PropTypes.nullable(PropTypes.string),
        description: PropTypes.string,
    })

export default combineReducers({
    niche: nicheReducer,
    language: languageReducer,
    HDSwitch: HDSwitchReducer,
    navigation: navigationReducer,
    search: searchReducer,
    burgerMenu: burgerMenuReducer,

    ui: provedHandleActions(mainHeaderUiModel, {
        [g(actions, 'toggleSearch')]: state =>
            state.set('isSearchShown', !state.get('isSearchShown')),
        [g(actions, 'setNewText')]: (state, {payload: {title, description}}) => state.merge({
            title,
            description,
        })
    }, fromJS({
        isSearchShown: false,
        title: 'Video Section - HD porn videos and crazy sex fucking action',
        description: `Top porn videos' website on the net today with the regularly updated \
        collection of HD videos and porn galleries that you will find out there`,
    }))
})
