import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './App/Home'
import AllNiches from './App/AllNiches'
import Niche from './App/AllNiches/Niche'
import AllMovies from './App/AllMovies'
import Pornstars from './App/Pornstars'
import Pornstar from './App/Pornstars/Pornstar'
import NotFound from './App/NotFound'

export default ({location}) => <Switch>
    <Route exact path="/" render={() => (
        location.get('search') === '?categories'
            ? <Redirect to="/all-niches"/>
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

    <Route render={props => {
        // for Server-Side Rendering to make real 404 status response
        if (props.staticContext) props.staticContext.status = 404

        return <NotFound {...props}/>
    }}/>
</Switch>
