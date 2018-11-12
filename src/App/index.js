import React from 'react'
import MainHeader from './MainHeader'
// import VideoList from './VideoList'
import MainFooter from './MainFooter'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {blueGrey, amber} from '@material-ui/core/colors/'

// TODO FIXME refactor this temporary hack for SSR
//import css from './assets/_.module.scss'

import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {throttle} from 'lodash'
import {resize} from './actions'

const
    theme = createMuiTheme({
        palette: {
            primary: blueGrey,
            secondary: amber,
        },
        typography: {
            useNextVariants: true,
        },
    })

export const App = ({location, children}) => <MuiThemeProvider theme={theme}>
    <div className='App'>
        <MainHeader/>
        {children ? children({location}) : null}
        <MainFooter/>
    </div>
</MuiThemeProvider>

export default compose(
    connect(
        state => ({
            location: state.getIn(['router', 'location'])
        }),
        dispatch => ({
            resizeAction: event => dispatch(resize(event.srcElement.outerWidth))
        })
    ),

    lifecycle({
        componentDidMount() {
            this.listener = throttle(this.props.resizeAction, 200)
            window.addEventListener('resize', this.listener)
        },

        componentWillUnmount() {
            window.removeEventListener('resize', this.listener)
        }
    })
)(App)
