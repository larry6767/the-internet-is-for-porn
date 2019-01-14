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
            ordering: {
                label: 'Sort',
                byDate: 'Recent',
                byDuration: 'Duration',
                byPopularity: 'Popularity',
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
            ordering: {
                label: 'Sortiert',
                byDate: 'Das Neueste',
                byDuration: 'Dauer',
                byPopularity: 'Popularität',
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
            ordering: {
                label: 'Ordina',
                byDate: 'Più Recenti',
                byDuration: 'I più lunghi',
                byPopularity: 'Popolari',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
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
