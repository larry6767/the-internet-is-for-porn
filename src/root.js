import React from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router/immutable'
import {Route, Switch, Redirect} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import Home from './App/Home'
import AllNiches from './App/AllNiches'
import Niche from './App/AllNiches/Niche'
import AllMovies from './App/AllMovies'
import Pornstars from './App/Pornstars'
import Pornstar from './App/Pornstars/Pornstar'
import NotFound from './App/NotFound'
import Favorite from './App/Favorite'

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
                    <Route exact path="/all-niches" component={AllNiches}/>
                    <Route path="/all-niches/:child/archive/(\d{4})-(\d{2})" component={Niche}/>
                    <Route path="/all-niches/:child" component={Niche}/>

                    <Route exact path="/all-movies.html" render={() => <Redirect to="/all-movies"/>}/>
                    <Route exact path="/all-movies" component={AllMovies}/>
                    <Route path="/all-movies/archive/(\d{4})-(\d{2})" component={AllMovies}/>

                    <Route exact path="/porn-stars.html" render={() => <Redirect to="/porn-stars"/>}/>
                    <Route exact path="/porn-stars" component={Pornstars}/>
                    <Route path="/porn-star/:child" component={Pornstar}/>

                    <Route path="/your-favorite.html" render={() => <Redirect to="/favorite"/>}/>
                    <Route exact path="/favorite" component={Favorite}/>

                    <Route path="/your-favorite-porn-stars.html" render={() => <Redirect to="/favorite-porn-stars"/>}/>
                    <Route path="/favorite-porn-stars" component={Favorite}/>

                    <Route path="*" component={NotFound}/>
                </Switch>}
            </App>
        </ConnectedRouter>
    </Provider>

export default Root
