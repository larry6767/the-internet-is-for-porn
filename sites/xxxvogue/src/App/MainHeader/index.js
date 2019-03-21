import React from 'react'
import {connect} from 'react-redux'
import {compose, withHandlers, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpoints,
} from 'src/App/helpers'

import {model} from 'src/App/MainHeader/models'
import Niche from 'src/App/MainHeader/Niche'
import Navigation from 'src/App/MainHeader/Navigation'
import Language from 'src/App/MainHeader/Language'
import Search from 'src/App/MainHeader/Search'
import BurgerMenu from 'src/App/MainHeader/BurgerMenu'
import actions from 'src/App/MainHeader/actions'
import {muiStyles} from 'src/App/MainHeader/assets/muiStyles'

import {
    StyledSpyLink,
    Header,
    Top,
    TopInner,
    SearchWrapper,
    NavigationWrapper,
    Logo,
    BottomInner,
} from 'src/App/MainHeader/assets'

const
    MainHeader = props => <Header>
        <Top>
            <TopInner>
                <SearchWrapper isSSR={g(props, 'isSSR')}>
                    {g(props, 'isMobile') && g(props, 'isSearchShown') ? null :
                        g(props, 'isMobile') ? <BurgerMenu/> : null}

                    {g(props, 'isMobile') && g(props, 'isSearchShown') ? null :
                        <StyledSpyLink to="/" isSpy={g(props, 'pageUrl') === '/'}>
                            <Logo
                                src="/img/logo.png"
                                alt="VideoSection logo"
                                isSSR={g(props, 'isSSR')}
                            />
                        </StyledSpyLink>}

                    {g(props, 'isMobile') && g(props, 'isSearchShown')
                        ? <CloseIcon
                            onClick={g(props, 'toggleSearchHandler')}
                            className={g(props, 'classes', 'closeIcon')}
                        />
                        : g(props, 'isMobile')
                        ? <SearchIcon
                            onClick={g(props, 'toggleSearchHandler')}
                            className={g(props, 'classes', 'searchIcon')}
                        />
                        : null}

                    { ! g(props, 'isMobile')
                        ? <Search/>
                        : g(props, 'isMobile') && g(props, 'isSearchShown')
                        ? <Search/>
                        : null}
                </SearchWrapper>
                <Niche/>
            </TopInner>
        </Top>
        { ! g(props, 'isMobile')
            ? <div>
                <BottomInner isSSR={g(props, 'isSSR')}>
                    <NavigationWrapper isSSR={g(props, 'isSSR')}>
                        <Navigation/>
                        {/* <HDSwitch/> */}
                    </NavigationWrapper>
                    <Language/>
                </BottomInner>
            </div>
            : null}
    </Header>

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: ig(state, 'app', 'mainHeader', 'ui'),
        }),
        {
            toggleSearch: g(actions, 'toggleSearch'),
        }
    ),
    withHandlers({
        toggleSearchHandler: props => () => props.toggleSearch()
    }),
    onlyUpdateForKeys(['cb', 'data']),
    withPropsOnChange(['cb', 'data'], props => ({
        isMobile: ccb(g(props, 'cb'), sm) === -1,
        isSearchShown: ig(props.data, 'isSearchShown'),
    })),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            searchIcon: PropTypes.string,
            closeIcon: PropTypes.string,
        }),
        isSSR: PropTypes.bool,
        pageUrl: PropTypes.string,
        cb: PropTypes.oneOf(breakpoints),
        data: model,
    }),
)(MainHeader)
