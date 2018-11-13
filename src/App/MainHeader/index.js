import React from 'react'
import Niche from './Niche'
import Navigation from './Navigation'
import HDSwitch from './HDSwitch'
import Language from './Language'
import Search from './Search'
import BurgerMenu from './BurgerMenu'
import {connect} from 'react-redux'
import {toggleSearch} from './actions'
import {
    Header,
    Top,
    TopInner,
    SearchWrapper,
    NavigationWrapper,
    Logo,
    SearchIcon,
    SearchIconClose,
    BottomInner
} from './assets'

const
    MainHeader = ({appUi, mainHeaderUi, toggleSearchAction}) => {
        const
            isXSorXXS =
                appUi.get('currentBreakpoint') === 'xs' ||
                appUi.get('currentBreakpoint') === 'xxs',

            isSearchShown = mainHeaderUi.get('isSearchShown')

        return <Header>
            <Top>
                <TopInner>
                    <SearchWrapper>
                        {
                            isXSorXXS && isSearchShown ? '' :
                            isXSorXXS ? <BurgerMenu/> : ''
                        }
                        {
                            isXSorXXS && isSearchShown ? '' :
                            <Logo src="/img/logo.png" alt="logo"/>
                        }
                        {
                            isXSorXXS && isSearchShown ?
                                <SearchIconClose
                                    onClick={toggleSearchAction}
                                />
                            : isXSorXXS ?
                                <SearchIcon
                                    onClick={toggleSearchAction}
                                />
                            : ''
                        }
                        {
                            !isXSorXXS ? <Search/> :
                            isXSorXXS && isSearchShown ? <Search/> : ''
                        }
                    </SearchWrapper>
                    <Niche/>
                </TopInner>
            </Top>
            <div>
                <BottomInner>
                    <NavigationWrapper>
                        <Navigation/>
                        <HDSwitch/>
                    </NavigationWrapper>
                    <Language/>
                </BottomInner>
            </div>
        </Header>
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
