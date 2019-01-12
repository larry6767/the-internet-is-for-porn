import {set} from 'lodash'

import {plainProvedGet as g} from './App/helpers'
import {PropTypes, assertPropTypes} from './App/helpers'
import {localeRouterModel} from './App/models'
import deepFreeze from './lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            routes: {
                archive: {label: 'archive'},
                allNiches: {section: 'all-niches'},
                niche: {section: 'all-niches'},
                allMovies: {section: 'all-movies'},
                pornstars: {section: 'porn-stars'},
                pornstar: {section: 'porn-star'},
                favorite: {section: 'favorite'}, // maybe "favorite-movies"?
                favoritePornstars: {section: 'favorite-porn-stars'},
                video: {sectionPfx: 'video-'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {from: '/all-movies.html'},
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
        },
        deu: {
            routes: {
                archive: {label: 'archiv'},
                allNiches: {section: 'alle-gruppen'},
                niche: {section: 'alle-gruppen'},
                allMovies: {section: 'alle-videos'},
                pornstars: {section: 'models'},
                pornstar: {section: 'model'},
                favorite: {section: 'favorisierten'}, // maybe "favorisierten-video"?
                favoritePornstars: {section: 'favorisierten-models'},
                video: {sectionPfx: 'video-'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {from: '/alle-vids.html'},
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
        },
        ita: {
            routes: {
                archive: {label: 'archivio'},
                allNiches: {section: 'tutte-le-categorie'},
                niche: {section: 'tutte-le-categorie'},
                allMovies: {section: 'tutti-i-film'},
                pornstars: {section: 'pornostar'},
                pornstar: {section: 'pornostar'},
                favorite: {section: 'preferiti'}, // maybe "filmati-preferiti"?
                favoritePornstars: {section: 'pornostar-preferiti'},
                video: {sectionPfx: 'film-'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {from: '/tutti-i-film.html'},
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
        },
        fra: {
            // TODO
        },
        spa: {
            // TODO
        },
        por: {
            // TODO
        },
        swe: {
            // TODO
        },
        nld: {
            // TODO
        },
        fin: {
            // TODO
        },
        rus: {
            // TODO
        },
        tur: {
            // TODO
        },
    })

/*
    A helper which could be used during application initialization to validate locales from server
    with own data structure.
*/
export const validate = siteLocales => {
    // generating model of every language code received from backend
    const mappingModel = PropTypes.exact(
        siteLocales.reduce((obj, x) => set(obj, g(x, 'code'), localeRouterModel), {})
    )

    // TODO implement other locales
    // assertPropTypes(mappingModel, mapping, 'router-locale-mapping', 'validate')
    assertPropTypes(localeRouterModel, mapping.eng, 'router-locale-mapping', 'validate')
    assertPropTypes(localeRouterModel, mapping.deu, 'router-locale-mapping', 'validate')
    assertPropTypes(localeRouterModel, mapping.ita, 'router-locale-mapping', 'validate')
}

export default mapping
