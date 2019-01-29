import React from 'react'
import {compose} from 'recompose'
import {Record} from 'immutable'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
} from '../helpers'
import Niche from './Niche'
import Navigation from './Navigation'
import Language from './Language'
import Search from './Search'
import BurgerMenu from './BurgerMenu'
import {connect} from 'react-redux'
import actions from './actions'
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
                                classes={{
                                    root: g(classes, 'typography'),
                                }}
                            >
                                {`${ig(data, 'title')}. `}
                            </Typography>
                            : null}
                        <Typography
                            variant="caption"
                            classes={{
                                root: g(classes, 'typography'),
                            }}
                        >
                            {ig(data, 'description')}
                        </Typography>
                    </TextWrapper>
                    <SearchWrapper
                        isSSR={isSSR}
                    >
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
    },

    dataRecord = Record({
        isSearchShown: false,
        title: '',
        description: '',
    })

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: dataRecord(ig(state, 'app', 'mainHeader', 'ui')),
        }),
        dispatch => ({
            toggleSearchAction: () => dispatch(actions.toggleSearch())
        })
    ),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        pageUrl: PropTypes.string,
        currentBreakpoint: PropTypes.string,
        data: ImmutablePropTypes.record,
    }),
)(MainHeader)
