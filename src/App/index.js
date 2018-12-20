import React, {Fragment} from 'react'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {blueGrey, amber} from '@material-ui/core/colors/'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {throttle} from 'lodash'
import actions from './actions'
import {ThemeProvider as SCThemeProvider} from 'styled-components'
import theme from './assets/theme'
import GlobalStyle from './assets/style'
import {Normalize} from 'styled-normalize'

const
    muiTheme = createMuiTheme({
        palette: {
            primary: blueGrey,
            secondary: amber,
        },
        typography: {
            useNextVariants: true,
        },
    })

export const App = ({sheetsManager, location, children}) => <MuiThemeProvider
    theme={muiTheme}
    sheetsManager={sheetsManager}
>
    <SCThemeProvider theme={theme}>
        <Fragment>
            <Normalize/>
            <GlobalStyle/>

            <div className='App'>
                <MainHeader/>
                {children ? children({location}) : null}
                <MainFooter/>
            </div>
        </Fragment>
    </SCThemeProvider>
</MuiThemeProvider>

export default compose(
    connect(
        state => ({
            location: state.getIn(['router', 'location'])
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
        }
    })
)(App)
