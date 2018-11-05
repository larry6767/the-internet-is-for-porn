import React from 'react'
import MainHeader from './MainHeader'
import VideoList from './VideoList'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {blueGrey, amber} from '@material-ui/core/colors/'
import './assets/_.module.scss'

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
    }),

    App = () => <MuiThemeProvider theme={theme}>
        <div className='App'>
            <MainHeader/>
            <VideoList/>
        </div>
    </MuiThemeProvider>

export default compose(
	connect(
        null,
		dispatch => ({
			resizeAction: event => dispatch(resize(event.srcElement.outerWidth))
		})
	),

	lifecycle({
		componentDidMount() {
			this.listener = throttle(this.props.resizeAction.bind(this), 500)
			window.addEventListener('resize', this.listener)
		},

		componentWillUnmount() {
            window.removeEventListener('resize', this.listener)
        }
	})
)(App)
