import {set} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'
import {pageKeys} from '../App/models'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from '../lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'all-movies',
                        gay: 'all-movies',
                        tranny: 'all-movies',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gays',
                tranny: '/shemales',
            },
        },
        deu: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'alle-vids',
                        gay: 'alle-videos',
                        tranny: 'alle-shemale-videos',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gay',
                tranny: '/transe',
            },
        },
        ita: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'tutti-i-film',
                        gay: 'tutti-i-film-gay',
                        tranny: 'tutti-trans-film',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gay',
                tranny: '/transessuale',
            },
        },
        fra: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'tout-les-tubes',
                        gay: 'toutes-les-vidéos-gays',
                        tranny: 'tous-les-clips-trans',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/homo',
                tranny: '/trans',
            },
        },
        spa: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'todas-películas',
                        gay: 'todas-películas',
                        tranny: 'todas-películas',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/homosexual',
                tranny: '/transexual',
            },
        },
        por: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'todas-as-cenas',
                        gay: 'todos-os-vids-tube',
                        tranny: 'cenas',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gays',
                tranny: '/travesti',
            },
        },
        swe: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'alla-tubevideor',
                        gay: 'videor',
                        tranny: 'filmer',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/bögiga',
                tranny: '/shemale',
            },
        },
        nld: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'alle-scenes',
                        gay: 'clips',
                        tranny: 'alle-videos',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gay',
                tranny: '/shemale',
            },
        },
        fin: {
            pageCode: { // TODO fill empty gaps for orientations
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'leffat',
                        gay: 'kaikki-klipit',
                        tranny: 'filmit',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/homo',
                tranny: '/shemale',
            },
        },
        rus: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'фильмы',
                        gay: 'все-эпизоды',
                        tranny: 'сцены',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/геи',
                tranny: '/транссексуал',
            },
        },
        tur: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                allMovies: {
                    code: {
                        straight: 'tüm-kanal-videoları',
                        gay: 'filmler',
                        tranny: 'sahneler',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%.html',
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%/%SUB_PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: '%ORIENTATION_PFX%/your-%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%%SUB_PAGE_CODE%',
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.html',
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gayler',
                tranny: '/travestiler',
            },
        },
    }),

    withoutPageCodeBranchModel = PropTypes.exact({
        url: PropTypes.string,
    }),

    pageCodeBranchModel = PropTypes.exact({
        code: PropTypes.exact({
            straight: PropTypes.string,
            gay: PropTypes.string,
            tranny: PropTypes.string,
        }),
        url: PropTypes.string,
    }),

    pageCodeModelProps = Object.freeze({
        home: withoutPageCodeBranchModel,
        allNiches: withoutPageCodeBranchModel,
        niche: withoutPageCodeBranchModel,
        allMovies: pageCodeBranchModel,
        pornstars: pageCodeBranchModel,
        pornstar: pageCodeBranchModel,
        favorite: pageCodeBranchModel,
        favoritePornstars: pageCodeBranchModel,
        video: pageCodeBranchModel,
        findVideos: pageCodeBranchModel,
        site: pageCodeBranchModel,
        notFound: withoutPageCodeBranchModel,
    }),

    localeInnardsModel = PropTypes.exact({
        pageCode: PropTypes.exact(pageCodeModelProps),
        orientationPrefixes: PropTypes.exact({
            straight: PropTypes.string,
            gay: PropTypes.string,
            tranny: PropTypes.string,
        }),
    }),

    frontPageKeysModel = PropTypes.exact(
        Object.keys(pageCodeModelProps).reduce((o, k) => set(o, k, PropTypes.string), {})
    ),

    pageKeysMapping = pageKeys.reduce((o, k) => set(o, k, k), {})

/*
    A helper which could be used during application initialization to validate locales from server
    with own data structure.
*/
export const validate = siteLocales => {
    // generating model of every language code received from backend
    const mappingModel = PropTypes.exact(
        siteLocales.reduce((obj, x) => set(obj, g(x, 'code'), localeInnardsModel), {})
    )

    assertPropTypes(mappingModel, mapping, 'api-locale-mapping', 'validate backend mapping')

    assertPropTypes(
        frontPageKeysModel,
        pageKeysMapping,
        'api-locale-mapping',
        'validate frontend page keys'
    )
}

export default mapping
