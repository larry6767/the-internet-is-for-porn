import React from 'react'
import Niche from './Niche'
import Navigation from './Navigation'
import HDSwitch from './HDSwitch'
import Language from './Language'
import Search from './Search'
import BurgerMenu from './BurgerMenu'
import css from './assets/_.module.scss'

import {connect} from 'react-redux'
import {toggleSearch} from './actions'

const
    MainHeader = ({appUi, mainHeaderUi, toggleSearchAction}) => {
        const
            isXS = appUi.get('currentBreakpoint') === 'xs',
            isSearchShown = mainHeaderUi.get('isSearchShown')

        return <header className={css.header}>
            <div className={css.top}>
                <div className={css.topInner}>
                    <div className={css.searchWrapper}>
                        {
                            isXS && isSearchShown ? '' :
                            isXS ? <BurgerMenu/> : ''
                        }
                        {   
                            isXS && isSearchShown ? '' :
                            <img className={css.logo} src="/img/logo.png" alt="logo"/>
                        }
                        {
                            isXS && isSearchShown ? <div className={css.searchIconClose} onClick={toggleSearchAction}></div> :
                            isXS ? <div className={css.searchIcon} onClick={toggleSearchAction}></div> : ''
                        }
                        {
                            !isXS ? <Search/> :
                            isXS && isSearchShown ? <Search/> : ''
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
