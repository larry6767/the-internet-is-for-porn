import {set} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from '../lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'all-movies',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: {
                straight: '',
                gay: '/gays',
                tranny: '/shemales',
            },
        },
        deu: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'alle-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: {
                straight: '',
                gay: '/gay',
                tranny: '/transe',
            },
        },
        ita: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'tutti-i-film',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: {
                straight: '',
                gay: '/gay',
                tranny: '/transessuale',
            },
        },
        fra: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'tout-les-tubes',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        spa: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'todas-películas',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        por: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'todas-as-cenas',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        swe: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'alla-tubevideor',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        nld: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'alle-scenes',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        fin: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'leffat',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        rus: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'фильмы',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        tur: {
            pageCode: {
                home: {code: 'home', url: '%ORIENTATION_PFX%/'},
                allNiches: {code: 'all-niches', url: '%ORIENTATION_PFX%/?categories'},
                niche: {code: 'niche', url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: 'tüm-kanal-videoları',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {code: 'porn-stars', url: '%ORIENTATION_PFX%/%PAGE_CODE%.html'},
                pornstar: {
                    code: 'porn-star',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {code: 'favorite', url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html'},
                favoritePornstars: {
                    code: 'favorite-porn-stars',
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {code: 'vid', url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
                findVideos: {
                    code: 'find-vids',
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
            },
            orientationPrefixes: { // TODO
                straight: '',
                gay: '',
                tranny: '',
            },
        },
    }),

    pageCodeBranchModel = PropTypes.exact({
        code: PropTypes.string,
        url: PropTypes.string,
    }),

    localeInnardsModel = PropTypes.exact({
        pageCode: PropTypes.exact({
            home: pageCodeBranchModel,
            allNiches: pageCodeBranchModel,
            niche: pageCodeBranchModel,
            allMovies: pageCodeBranchModel,
            pornstars: pageCodeBranchModel,
            pornstar: pageCodeBranchModel,
            favorite: pageCodeBranchModel,
            favoritePornstars: pageCodeBranchModel,
            video: pageCodeBranchModel,
            findVideos: pageCodeBranchModel,
        }),
        orientationPrefixes: PropTypes.exact({
            straight: PropTypes.string,
            gay: PropTypes.string,
            tranny: PropTypes.string,
        }),
    })

/*
    A helper which could be used during application initialization to validate locales from server
    with own data structure.
*/
export const validate = siteLocales => {
    // generating model of every language code received from backend
    const mappingModel = PropTypes.exact(
        siteLocales.reduce((obj, x) => set(obj, g(x, 'code'), localeInnardsModel), {})
    )

    assertPropTypes(mappingModel, mapping, 'api-locale-mapping', 'validate')
}

export default mapping
