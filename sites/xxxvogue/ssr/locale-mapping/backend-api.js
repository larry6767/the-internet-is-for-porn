import {set} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'
import {pageKeys} from 'src/App/pageKeysModel'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from 'ssr/lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            pageCode: {
                home: {url: '%ORIENTATION_PFX%/'},
                allNiches: {url: '%ORIENTATION_PFX%/?categories'},
                niche: {url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%.html'},
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
                pornstars: {
                    code: {straight: 'models', gay: 'models', tranny: 'models'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                pornstar: {
                    code: {straight: 'model', gay: 'model', tranny: 'model'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%/%PAGE_CODE%.html',
                },
                favorite: {
                    code: {straight: 'favorites', gay: 'favorites', tranny: 'favorites'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                favoritePornstars: {
                    code: {
                        straight: 'models-favorites',
                        gay: 'models-favorites',
                        tranny: 'models-favorites',
                    },
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%.html',
                },
                video: {
                    code: {straight: 'vid', gay: 'vid', tranny: 'vid'},
                    url: '%ORIENTATION_PFX%/%PAGE_CODE%-%SUB_PAGE_CODE%.htm',
                },
                findVideos: {
                    code: {straight: 'find', gay: 'find', tranny: 'find'},
                    url: '%ORIENTATION_PFX%/%SUB_PAGE_CODE%%PAGE_CODE%%SUB_PAGE_CODE_SECOND_PIECE%',
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
