import React from 'react'
import MainHeader from './MainHeader'
// import VideoList from './VideoList'
import MainFooter from './MainFooter'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {blueGrey, amber} from '@material-ui/core/colors/'
import './assets/_.module.scss'

import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {throttle} from 'lodash'
import {resize} from './actions'

import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './Home'
import AllNiches from './AllNiches'
import AllMovies from './AllMovies'
import Pornstars from './Pornstars'
import NotFound from './NotFound'

import history from '../history'
import {ConnectedRouter} from 'connected-react-router/immutable'

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

    App = ({location}) => <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
            <div className='App'>
                <MainHeader/>

                <Switch>
                    <Route exact path="/" render={() => (
                        location.get('search') === '?categories'
                            ? <Redirect to='/all-niches'/>
                            : <Home/>
                    )}/>
                    <Route path="/all-niches" component={AllNiches}/>

                    <Route exact path="/all-movies.html" render={() => <Redirect to='/all-movies'/>}/>
                    <Route path="/all-movies" component={AllMovies}/>

                    <Route exact path="/porn-stars.html" render={() => <Redirect to='/pornstars'/>}/>
                    <Route path="/pornstars" component={Pornstars}/>
                    <Route path="*" component={NotFound}/>
                </Switch>

                <MainFooter/>
            </div>
        </ConnectedRouter>
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
			this.listener = throttle(this.props.resizeAction.bind(this), 200)
			window.addEventListener('resize', this.listener)
		},

		componentWillUnmount() {
            window.removeEventListener('resize', this.listener)
        }
	})
)(App)
