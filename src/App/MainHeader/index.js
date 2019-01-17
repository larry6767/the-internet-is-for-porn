import React from 'react'
import {compose, setPropTypes} from 'recompose'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {
    immutableProvedGet as ig,
    PropTypes,
} from '../helpers'
import Niche from './Niche'
import Navigation from './Navigation'
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
    Icon,
    BottomInner,
    TextWrapper,
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    MainHeader = ({
        classes, isSSR, pageUrl, currentBreakpoint,
        isSearchShown, toggleSearchAction
    }) => {
        const
            isXSorXXS = currentBreakpoint === 'xs' || currentBreakpoint === 'xxs'

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
                            <Link
                                to="/"
                                className={pageUrl === '/' ? classes.routerLinkSpy : ''}
                            >
                                <Logo src="/img/logo.png" alt="VideoSection logo"/>
                            </Link>
                        }
                        {
                            isXSorXXS
                                ? <Icon
                                    type={isXSorXXS && isSearchShown
                                        ? 'close'
                                        : isXSorXXS
                                        ? 'search'
                                        : ''}
                                    onClick={toggleSearchAction}
                                />
                                : null
                        }
                        {
                            !isXSorXXS ? <Search/> :
                            isXSorXXS && isSearchShown ? <Search/> : ''
                        }
                    </SearchWrapper>
                    <Niche/>
                    <TextWrapper>

                    </TextWrapper>
                </TopInner>
            </Top>
            {
                !isXSorXXS
                    ? <div>
                        <BottomInner isSSR={isSSR}>
                            <NavigationWrapper>
                                <Navigation/>
                                {/* <HDSwitch/> */}
                            </NavigationWrapper>
                            <Language/>
                        </BottomInner>
                    </div>
                    : null
            }
        </Header>
    }

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            isSearchShown: ig(state, 'app', 'mainHeader', 'ui', 'isSearchShown'),
        }),
        dispatch => ({
            toggleSearchAction: () => dispatch(toggleSearch())
        })
    ),
    withStyles(muiStyles),
    setPropTypes({
        isSSR: PropTypes.bool,
        pageUrl: PropTypes.string,
        currentBreakpoint: PropTypes.string,
        isSearchShown: PropTypes.bool,
    }),
)(MainHeader)
