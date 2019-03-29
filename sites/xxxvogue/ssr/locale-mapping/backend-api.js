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
    ARCHIVE_MASK as archive,
    QUERY_STRING_MASK as qs,
} from 'ssr/locale-mapping/backend-api-masks' // just for compact view

const
    mapping = deepFreeze({
        eng: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gay',
                tranny: '/tranny',
            },
        },
        deu: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gay',
                tranny: '/transen',
            },
        },
        ita: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/homo',
                tranny: '/travella',
            },
        },
        fra: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
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
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/homosexual',
                tranny: '/shemale',
            },
        },
        por: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gay',
                tranny: '/travesti',
            },
        },
        swe: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/bögiga',
                tranny: '/transvestit',
            },
        },
        nld: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/homos',
                tranny: '/shemale',
            },
        },
        fin: {
            pageCode: { // TODO fill empty gaps for orientations
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/homot',
                tranny: '/shemale',
            },
        },
        rus: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/геи',
                tranny: '/транс',
            },
        },
        tur: {
            pageCode: {
                home: {url: `${orientation}/`},
                allNiches: {url: `${orientation}/?categories`},
                niche: {url: `${orientation}/${ordering}${child}${archive}.html${qs}`}, // ?f=1
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: `${orientation}/${page}.html`,
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: `${orientation}/${ordering}${child}/${page}.html${qs}`, // ?f=1
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: `${orientation}/${page}.html${qs}`,
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: `${orientation}/${page}.html${qs}`,
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: `${orientation}/${child}${subchild}.htm${qs}`,
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: `${orientation}/${ordering}${page}${qs}`, // ?p=1
                },
                notFound: {url: '/error404.html'},
            },
            orientationPrefixes: {
                straight: '', // no prefix
                gay: '/gay',
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
        pornstars: pageCodeBranchModel,
        pornstar: pageCodeBranchModel,
        favorite: pageCodeBranchModel,
        favoritePornstars: pageCodeBranchModel,
        video: pageCodeBranchModel,
        findVideos: pageCodeBranchModel,
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
