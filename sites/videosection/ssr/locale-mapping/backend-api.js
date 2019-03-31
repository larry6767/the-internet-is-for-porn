import {set} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'
import {pageKeys} from 'src/App/pageKeysModel'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from 'ssr/lib/helpers/deepFreeze'

import {
    ORIENTATION_MASK as orientation,
    PAGE_CODE_MASK as page,
    CHILD_MASK as child,
    SUBCHILD_MASK as subchild,
    ORDERING_MASK as ordering,
    PAGINATION_MASK as pagination,
    ARCHIVE_MASK as archive,
    QUERY_STRING_MASK as qs,
} from 'ssr/locale-mapping/backend-api-masks' // just for compact view

const
    mapping = deepFreeze({
        eng: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'all-movies',
                        gay: 'all-movies',
                        tranny: 'all-movies',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'alle-vids',
                        gay: 'alle-videos',
                        tranny: 'alle-shemale-videos',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'tutti-i-film',
                        gay: 'tutti-i-film-gay',
                        tranny: 'tutti-trans-film',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'tout-les-tubes',
                        gay: 'toutes-les-vidéos-gays',
                        tranny: 'tous-les-clips-trans',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'todas-películas',
                        gay: 'todas-películas',
                        tranny: 'todas-películas',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'todas-as-cenas',
                        gay: 'todos-os-vids-tube',
                        tranny: 'cenas',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'alla-tubevideor',
                        gay: 'videor',
                        tranny: 'filmer',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'alle-scenes',
                        gay: 'clips',
                        tranny: 'alle-videos',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'leffat',
                        gay: 'kaikki-klipit',
                        tranny: 'filmit',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'фильмы',
                        gay: 'все-эпизоды',
                        tranny: 'сцены',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${child}${archive}${ordering}${pagination}.html`},
                allMovies: {
                    code: {
                        straight: 'tüm-kanal-videoları',
                        gay: 'filmler',
                        tranny: 'sahneler',
                    },
                    url: `${orientation}/${page}${archive}${ordering}${pagination}.html`,
                },
                pornstars: {
                    code: {straight: 'porn-stars', gay: 'porn-stars', tranny: 'porn-stars'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'porn-star', gay: 'porn-star', tranny: 'porn-star'},
                    url: `${orientation}/${page}/${child}${ordering}${pagination}.html`,
                },
                favorite: {
                    code: {straight: 'favorite', gay: 'favorite', tranny: 'favorite'},
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'favorite-porn-stars',
                        gay: 'favorite-porn-stars',
                        tranny: 'favorite-porn-stars',
                    },
                    url: `${orientation}/your-${page}${pagination}.html`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${page}-${child}/${subchild}.htm`,
                },
                findVideos: {
                    code: {straight: 'find-vids', gay: 'find-vids', tranny: 'find-vids'},
                    url: `${orientation}/${page}${ordering}${qs}`,
                },
                site: {
                    code: {straight: 'site', gay: 'site', tranny: 'site'},
                    url: `${orientation}/${page}-${child}${ordering}${pagination}.html`,
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
