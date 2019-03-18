import React from 'react'
import {connect} from 'react-redux'
import {compose, onlyUpdateForKeys} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
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
    Icon,
    BottomInner,
    TextWrapper,
} from 'src/App/MainHeader/assets'

const
    MainHeader = ({
        classes, isSSR, pageUrl, currentBreakpoint,
        data, toggleSearchAction
    }) => {
        const
            isXSorXXS = currentBreakpoint === 'xs' || currentBreakpoint === 'xxs',
            isSearchShown = ig(data, 'isSearchShown')

        return <Header>
            <Top>
                <TopInner>
                    <TextWrapper>
                        {ig(data, 'title')
                            ? <Typography
                                variant="caption"
                                gutterBottom
                                className={g(classes, 'typography')}
                            >
                                {`${ig(data, 'title')}. `}
                            </Typography>
                            : null}
                        <Typography variant="caption" className={g(classes, 'typography')}>
                            {ig(data, 'description')}
                        </Typography>
                    </TextWrapper>
                    <SearchWrapper isSSR={isSSR}>
                        {
                            isXSorXXS && isSearchShown ? '' :
                            isXSorXXS ? <BurgerMenu/> : ''
                        }
                        {
                            isXSorXXS && isSearchShown ? '' :
                            <StyledSpyLink to="/" isSpy={pageUrl === '/'}>
                                <Logo src="/img/logo.png" alt="VideoSection logo" isSSR={isSSR}/>
                            </StyledSpyLink>
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
                </TopInner>
            </Top>
            {
                !isXSorXXS
                    ? <div>
                        <BottomInner isSSR={isSSR}>
                            <NavigationWrapper isSSR={isSSR}>
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
            data: ig(state, 'app', 'mainHeader', 'ui'),
        }),
        dispatch => ({
            toggleSearchAction: () => dispatch(actions.toggleSearch())
        })
    ),
    onlyUpdateForKeys(['currentBreakpoint', 'data']),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        pageUrl: PropTypes.string,
        currentBreakpoint: PropTypes.string,
        data: model,
    }),
)(MainHeader)
