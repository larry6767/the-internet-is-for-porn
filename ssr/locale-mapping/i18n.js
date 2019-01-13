import {set} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'
import {i18nModel} from '../App/models'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from '../lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            navigation: {
                home: {title: 'Home'},
                allNiches: {title: 'All Niches'},
                allMovies: {title: 'All Movies'},
                pornstars: {title: 'Pornstars'},
                favorite: {title: 'Favorite'},
            },
            allNiches: {
                pageHeader: 'All Niches',
            },
        },
        deu: {
            navigation: {
                home: {title: 'Hauptseite'},
                allNiches: {title: 'Alle Gruppen'},
                allMovies: {title: 'Alle Vids'},
                pornstars: {title: 'Models'},
                favorite: {title: 'Favorisierten'},
            },
            allNiches: {
                pageHeader: 'Alle Gruppen',
            },
        },
        ita: {
            navigation: {
                home: {title: 'Principale'},
                allNiches: {title: 'Tutte le Categorie'},
                allMovies: {title: 'Tutti I Film'},
                pornstars: {title: 'Pornostar '},
                favorite: {title: 'Preferiti'},
            },
            allNiches: {
                pageHeader: 'Tutte le Categorie',
            },
        },
        fra: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
        spa: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
        por: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
        swe: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
        nld: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
        fin: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
        rus: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
        tur: { // TODO
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
        },
    })

/*
    A helper which could be used during application initialization to validate locales from server
    with own data structure.
*/
export const validate = siteLocales => {
    // generating model of every language code received from backend
    const mappingModel = PropTypes.exact(
        siteLocales.reduce((obj, x) => set(obj, g(x, 'code'), i18nModel), {})
    )

    assertPropTypes(mappingModel, mapping, 'api-locale-mapping', 'validate')
}

export default mapping
