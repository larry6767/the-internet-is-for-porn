import g from './plain/provedGet'
import {routerGetters} from '../../router-builder'

// A helper for <Navigation> and <BurgerMenu>
export default props => navKey => {
    switch (navKey) {
        case 'home':
        case 'allNiches':
        case 'pornstars':
            return g(routerGetters, navKey, 'link')(g(props, 'routerContext'))
        case 'allMovies':
        case 'favorite':
            return g(routerGetters, navKey, 'link')(g(props, 'routerContext'), null)
        default:
            throw new Error(`Unexpected navigation key: ${JSON.stringify(navKey)}`)
    }
}
