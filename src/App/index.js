import {throttle} from 'lodash'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, setPropTypes} from 'recompose'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider as SCThemeProvider} from 'styled-components'
import {Normalize} from 'styled-normalize'

import {immutableProvedGet as ig, PropTypes} from './helpers'
import {immutableLocaleRouterModel, routerLocationModel} from './models'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import actions from './actions'
import theme from './assets/theme'
import GlobalStyle from './assets/style'

const
    muiTheme = createMuiTheme({
        palette: {
            primary: {...theme.palette.primary},
            secondary: {...theme.palette.secondary},
            error: {...theme.palette.error},
            success: {...theme.palette.success},
        },
        typography: {
            useNextVariants: true,
        },
    })

export const App = ({sheetsManager, location, router, children}) => <MuiThemeProvider
    theme={muiTheme}
    sheetsManager={sheetsManager}
>
    <SCThemeProvider theme={theme}>
        <Fragment>
            <Normalize/>
            <GlobalStyle/>

            <div className='App'>
                <MainHeader/>
                {children ? children({location, router}) : null}
                <MainFooter/>
            </div>
        </Fragment>
    </SCThemeProvider>
</MuiThemeProvider>

export default compose(
    connect(
        state => ({
            location: ig(state, 'router', 'location'),
            router: ig(state, 'app', 'locale', 'router'),
        }),
        dispatch => ({
            resizeAction: event => dispatch(actions.resize(
                typeof event === "number" ? event : event.srcElement.outerWidth
            )),
            getFavoriteVideoListAction: () => dispatch(actions.getFavoriteVideoList()),
            getFavoritePornstarListAction: () => dispatch(actions.getFavoritePornstarList())
        })
    ),

    lifecycle({
        componentDidMount() {
            this.listener = throttle(this.props.resizeAction, 200)
            window.addEventListener('resize', this.listener)
            this.props.resizeAction(document.documentElement.clientWidth)
            this.props.getFavoriteVideoListAction()
            this.props.getFavoritePornstarListAction()
        },

        componentWillUnmount() {
            window.removeEventListener('resize', this.listener)
        },
    }),

    setPropTypes({
        location: routerLocationModel,
        router: immutableLocaleRouterModel,

        // In bare usage of <App> in SSR these are not passed (that's why they're optional).
        resizeAction: PropTypes.func.isOptional,
        getFavoriteVideoListAction: PropTypes.func.isOptional,
        getFavoritePornstarListAction: PropTypes.func.isOptional,
    })
)(App)
