import {fromJS} from 'immutable'

import {ImmutablePropTypes, PropTypes, provedHandleActions, plainProvedGet as g} from '../helpers'
import actions from './actions'

import {combineReducers} from 'redux-immutable'
import nicheReducer from './Niche/reducers'
import languageReducer from './Language/reducers'
import HDSwitchReducer from './HDSwitch/reducers'
import navigationReducer from './Navigation/reducers'
import searchReducer from './Search/reducers'
import burgerMenuReducer from './BurgerMenu/reducers'

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
