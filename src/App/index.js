import React from 'react'
import MainHeader from './MainHeader'
// import VideoList from './VideoList'
import MainFooter from './MainFooter'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {blueGrey, amber} from '@material-ui/core/colors/'
import css from './assets/_.module.scss'

import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {throttle} from 'lodash'
import {resize} from './actions'

import {Route, NavLink, Switch} from 'react-router-dom'

import Home from './Home'
import AllNiches from './AllNiches'
import AllMovies from './AllMovies'
import Pornstars from './Pornstars'
import NotFound from './NotFound'

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
            <div className={css.page}>
                <ul>
                    <li><NavLink activeStyle={{color: 'red'}} to='/categories'>categories</NavLink></li>
                    <li><NavLink activeStyle={{color: 'red'}} to='/all-movies.html'>all-movies.html</NavLink></li>
                    <li><NavLink activeStyle={{color: 'red'}} to='/porn-stars.html'>porn-stars.html</NavLink></li>
                </ul>

                {/* <VideoList/> */}
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="/categories" component={AllNiches}/>
                    <Route path="/all-movies.html" component={AllMovies}/>
                    <Route path="/porn-stars.html" component={Pornstars}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
            <MainFooter/>
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
			this.listener = throttle(this.props.resizeAction.bind(this), 200)
			window.addEventListener('resize', this.listener)
		},

		componentWillUnmount() {
            window.removeEventListener('resize', this.listener)
        }
	})
)(App)
