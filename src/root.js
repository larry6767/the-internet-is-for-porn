import React from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router/immutable'
import {Route, Switch, Redirect} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import Home from './App/Home'
import AllNiches from './App/AllNiches'
import AllMovies from './App/AllMovies'
import Pornstars from './App/Pornstars'
import NotFound from './App/NotFound'

const
    Root = () => <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                {/* WARNING! keep this up to date with SSR routing! */}
                {({location}) => <Switch>
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
                </Switch>}
            </App>
        </ConnectedRouter>
    </Provider>

export default Root
