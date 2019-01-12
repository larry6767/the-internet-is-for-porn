import {set} from 'lodash'

import {plainProvedGet as g} from './App/helpers'
import {PropTypes, assertPropTypes} from './App/helpers'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from './lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'all-movies', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        deu: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'alle-vids', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        ita: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'tutti-i-film', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        fra: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'tout-les-tubes', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        spa: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'todas-películas', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        por: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'todas-as-cenas', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        swe: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'alla-tubevideor', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        nld: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'alle-scenes', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        fin: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'leffat', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        rus: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'фильмы', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        tur: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'tüm-kanal-videoları', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
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
