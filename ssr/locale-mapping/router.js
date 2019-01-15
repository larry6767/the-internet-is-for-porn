import {set} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'
import {localeRouterModel} from '../App/models'
import deepFreeze from '../lib/helpers/deepFreeze'

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
                findVideos: {section: 'find-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {from: '/all-movies.html'},
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'sort',
                byDate: {qsValue: 'latest'},
                byDuration: {qsValue: 'longest'},
                byPopularity: {qsValue: 'popular'},
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
                findVideos: {section: 'find-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {from: '/alle-vids.html'},
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'sortiert',
                byDate: {qsValue: 'das-neueste'},
                byDuration: {qsValue: 'dauer'},
                byPopularity: {qsValue: 'popularität'},
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
                findVideos: {section: 'find-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {from: '/tutti-i-film.html'},
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'ordina',
                byDate: {qsValue: 'più-recenti'},
                byDuration: {qsValue: 'i-più-lunghi'},
                byPopularity: {qsValue: 'popolari'},
            },
        },
        fra: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
            },
        },
        spa: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
            },
        },
        por: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
            },
        },
        swe: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
            },
        },
        nld: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
            },
        },
        fin: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
            },
        },
        rus: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
            },
        },
        tur: { // TODO
            routes: {
                archive: {label: ''},
                allNiches: {section: ''},
                niche: {section: ''},
                allMovies: {section: ''},
                pornstars: {section: ''},
                pornstar: {section: ''},
                favorite: {section: ''},
                favoritePornstars: {section: ''},
                video: {sectionPfx: ''},
                findVideos: {section: ''},
            },
            redirects: {
                categories: {search: ''},
                allMovies: {from: ''},
                pornstars: {from: ''},
                favorite: {from: '', fromMovies: ''},
                favoritePornstars: {from: ''},
                video: {fromPfx: '', fromExt: ''},
            },
            ordering: {
                qsKey: '',
                byDate: {qsValue: ''},
                byDuration: {qsValue: ''},
                byPopularity: {qsValue: ''},
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
        siteLocales.reduce((obj, x) => set(obj, g(x, 'code'), localeRouterModel), {})
    )

    assertPropTypes(mappingModel, mapping, 'router-locale-mapping', 'validate')
}

export default mapping
