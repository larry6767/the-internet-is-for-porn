import React from 'react'
import Niche from './Niche'
import Navigation from './Navigation'
import HDSwitch from './HDSwitch'
import Language from './Language'
import Search from './Search'
import BurgerMenu from './BurgerMenu'

// TODO FIXME refactor this temporary hack for SSR
//import css from './assets/_.module.scss'

import {connect} from 'react-redux'
import {toggleSearch} from './actions'

// TODO FIXME refactor this temporary hack for SSR
const css = {}

const
    MainHeader = ({appUi, mainHeaderUi, toggleSearchAction}) => {
        const
            isXSorXXS = appUi.get('currentBreakpoint') === 'xs' || appUi.get('currentBreakpoint') === 'xxs',
            isSearchShown = mainHeaderUi.get('isSearchShown')

        return <header className={css.header}>
            <div className={css.top}>
                <div className={css.topInner}>
                    <div className={css.searchWrapper}>
                        {
                            isXSorXXS && isSearchShown ? '' :
                            isXSorXXS ? <BurgerMenu/> : ''
                        }
                        {
                            isXSorXXS && isSearchShown ? '' :
                            <img className={css.logo} src="/img/logo.png" alt="logo"/>
                        }
                        {
                            isXSorXXS && isSearchShown ? <div className={css.searchIconClose} onClick={toggleSearchAction}></div> :
                            isXSorXXS ? <div className={css.searchIcon} onClick={toggleSearchAction}></div> : ''
                        }
                        {
                            !isXSorXXS ? <Search/> :
                            isXSorXXS && isSearchShown ? <Search/> : ''
                        }
                    </div>
                    <Niche/>
                </div>
            </div>
            <div className={css.bottom}>
                <div className={css.bottomInner}>
                    <div className={css.navigationWrapper}>
                        <Navigation/>
                        <HDSwitch/>
                    </div>
                    <Language/>
                </div>
            </div>
        </header>
    }

export default connect(
    state => ({
        appUi: state.getIn(['app', 'ui']),
        mainHeaderUi: state.getIn(['app', 'mainHeader', 'ui'])
    }),
    dispatch => ({
        toggleSearchAction: () => dispatch(toggleSearch())
    })
)(MainHeader)
