import {set, includes} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'
import {ssrLocaleRouterModel} from '../App/models'
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
                favorite: {section: 'favorite-movies'},
                favoritePornstars: {section: 'favorite-porn-stars'},
                video: {section: 'video'},
                findVideos: {section: 'find-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/all-movies.html',
                        gay: '/all-movies.html',
                        tranny: '/all-movies.html',
                    }
                },
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
                byRelevant: {qsValue: 'relevant'},
            },
            pagination: {
                qsKey: 'page',
            },
            searchQuery: {
                qsKey: 'query'
            },
            orientation: {
                straight: '',
                gay: '/gays',
                tranny: '/shemales',
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
                favorite: {section: 'favorisierten-video'},
                favoritePornstars: {section: 'favorisierten-models'},
                video: {section: 'video'},
                findVideos: {section: 'finde-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/alle-vids.html',
                        gay: '/alle-videos.html',
                        tranny: '/alle-shemale-videos.html',
                    }
                },
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
                byRelevant: {qsValue: 'ähnlich'},
            },
            pagination: {
                qsKey: 'seite',
            },
            searchQuery: {
                qsKey: 'abfrage'
            },
            orientation: {
                straight: '',
                gay: '/gay',
                tranny: '/transe',
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
                favorite: {section: 'filmati-preferiti'},
                favoritePornstars: {section: 'pornostar-preferiti'},
                video: {section: 'film'},
                findVideos: {section: 'trova-video'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/tutti-i-film.html',
                        gay: '/tutti-i-film-gay.html',
                        tranny: '/tutti-trans-film.html',
                    }
                },
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
                byRelevant: {qsValue: 'сorrelati'},
            },
            pagination: {
                qsKey: 'pagina',
            },
            searchQuery: {
                qsKey: 'domanda'
            },
            orientation: {
                straight: '',
                gay: '/gay',
                tranny: '/transessuale',
            },
        },
        fra: {
            routes: {
                archive: {label: 'archiver'},
                allNiches: {section: 'toutes-les-niches'},
                niche: {section: 'toutes-les-niches'},
                allMovies: {section: 'tout-les-tubes'},
                pornstars: {section: 'des-stars-du-porno'},
                pornstar: {section: 'pornostar'},
                favorite: {section: 'vidéos-préférées'},
                favoritePornstars: {section: 'stars-du-porno-préférées'},
                video: {section: 'vidéo'},
                findVideos: {section: 'trouver-des-vidéos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/tout-les-tubes.html',
                        gay: '/toutes-les-vidéos-gays.html',
                        tranny: '/tous-les-clips-trans.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'trier',
                byDate: {qsValue: 'dernier'},
                byDuration: {qsValue: 'le-plus-long'},
                byPopularity: {qsValue: 'populaire'},
                byRelevant: {qsValue: 'pertinent'},
            },
            pagination: {
                qsKey: 'page',
            },
            searchQuery: {
                qsKey: 'question'
            },
            orientation: {
                straight: '',
                gay: '/homo',
                tranny: '/transexuel',
            },
        },
        spa: {
            routes: {
                archive: {label: 'archivo'},
                allNiches: {section: 'todas-las-nichos'},
                niche: {section: 'todas-las-nichos'},
                allMovies: {section: 'todas-películas'},
                pornstars: {section: 'estrellas-porno'},
                pornstar: {section: 'pornstar'},
                favorite: {section: 'video-favorito'},
                favoritePornstars: {section: 'estrellas-porno-favoritas'},
                video: {section: 'vídeo'},
                findVideos: {section: 'encontrar-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/todas-películas.html',
                        gay: '/todas-películas.html',
                        tranny: '/todas-películas.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'ordenar',
                byDate: {qsValue: 'novedades'},
                byDuration: {qsValue: 'más-largo'},
                byPopularity: {qsValue: 'popular'},
                byRelevant: {qsValue: 'pertinente'},
            },
            pagination: {
                qsKey: 'página',
            },
            searchQuery: {
                qsKey: 'consulta'
            },
            orientation: {
                straight: '',
                gay: '/homosexual',
                tranny: '/transexual',
            },
        },
        por: {
            routes: {
                archive: {label: 'arquivo'},
                allNiches: {section: 'todas-as-niches'},
                niche: {section: 'todas-as-niches'},
                allMovies: {section: 'todos-os-vids-tube'},
                pornstars: {section: 'pornstars'},
                pornstar: {section: 'pornstar'},
                favorite: {section: 'vídeos-favoritos'},
                favoritePornstars: {section: 'estrelas-porno-favoritas'},
                video: {section: 'vídeo'},
                findVideos: {section: 'encontrar-vídeos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/todas-as-cenas.html',
                        gay: '/todos-os-vids-tube.html',
                        tranny: '/cenas.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'tipo',
                byDate: {qsValue: 'mais-recentes'},
                byDuration: {qsValue: 'mais-longo'},
                byPopularity: {qsValue: 'popular'},
                byRelevant: {qsValue: 'relevante'},
            },
            pagination: {
                qsKey: 'página',
            },
            searchQuery: {
                qsKey: 'inquerir'
            },
            orientation: {
                straight: '',
                gay: '/gays',
                tranny: '/travesti',
            },
        },
        swe: {
            routes: {
                archive: {label: 'arkiv'},
                allNiches: {section: 'alla-kategorier'},
                niche: {section: 'alla-kategorier'},
                allMovies: {section: 'alla-scener'},
                pornstars: {section: 'porrstjärnor'},
                pornstar: {section: 'porrstjärna'},
                favorite: {section: 'favoritvideor'},
                favoritePornstars: {section: 'favoritpornstjärnor'},
                video: {section: 'videoklipp'},
                findVideos: {section: 'hitta-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/alla-tubevideor.html',
                        gay: '/videor.html',
                        tranny: '/filmer.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'sortera',
                byDate: {qsValue: 'senast'},
                byDuration: {qsValue: 'längsta'},
                byPopularity: {qsValue: 'populär'},
                byRelevant: {qsValue: 'relevant'},
            },
            pagination: {
                qsKey: 'sida',
            },
            searchQuery: {
                qsKey: 'fråga'
            },
            orientation: {
                straight: '',
                gay: '/bögiga',
                tranny: '/shemale',
            },
        },
        nld: {
            routes: {
                archive: {label: 'archief'},
                allNiches: {section: 'alle-groepen'},
                niche: {section: 'alle-groepen'},
                allMovies: {section: 'alle-videos'},
                pornstars: {section: 'pornosterren'},
                pornstar: {section: 'pornstar'},
                favorite: {section: 'favoriete-videos'},
                favoritePornstars: {section: 'favoriete-pornosterren'},
                video: {section: 'video'},
                findVideos: {section: 'vind-videos'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/alle-scenes.html',
                        gay: '/clips.html',
                        tranny: '/alle-videos.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'soort',
                byDate: {qsValue: 'laatste'},
                byDuration: {qsValue: 'langste'},
                byPopularity: {qsValue: 'populair'},
                byRelevant: {qsValue: 'relevant'},
            },
            pagination: {
                qsKey: 'pagina',
            },
            searchQuery: {
                qsKey: 'vraag'
            },
            orientation: {
                straight: '',
                gay: '/gay',
                tranny: '/shemale',
            },
        },
        fin: {
            routes: {
                archive: {label: 'arkisto'},
                allNiches: {section: 'kaikki-nichet'},
                niche: {section: 'kaikki-nichet'},
                allMovies: {section: 'leffat'},
                pornstars: {section: 'pornotähtiä'},
                pornstar: {section: 'pornotähti'},
                favorite: {section: 'suosikkivideo'},
                favoritePornstars: {section: 'suosikki-pornotähti'},
                video: {section: 'videot'},
                findVideos: {section: 'löydä-videoita'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/leffat.html',
                        gay: '/kaikki-klipit.html',
                        tranny: '/filmit.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'järjestellä',
                byDate: {qsValue: 'uusin'},
                byDuration: {qsValue: 'pisin'},
                byPopularity: {qsValue: 'suosittu'},
                byRelevant: {qsValue: 'merkityksellinen'},
            },
            pagination: {
                qsKey: 'sivu',
            },
            searchQuery: {
                qsKey: 'tiedustelu'
            },
            orientation: {
                straight: '',
                gay: '/homo',
                tranny: '/shemale',
            },
        },
        rus: {
            routes: {
                archive: {label: 'архив'},
                allNiches: {section: 'все-группы'},
                niche: {section: 'все-группы'},
                allMovies: {section: 'все-фильмы'},
                pornstars: {section: 'модели'},
                pornstar: {section: 'модель'},
                favorite: {section: 'ибранные-видео'},
                favoritePornstars: {section: 'избранные-модели'},
                video: {section: 'видео'},
                findVideos: {section: 'найти-видео'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/фильмы.html',
                        gay: '/все-эпизоды.html',
                        tranny: '/сцены.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'сортировать',
                byDate: {qsValue: 'по-дате-добавления'},
                byDuration: {qsValue: 'по-длительности'},
                byPopularity: {qsValue: 'по-рейтингу'},
                byRelevant: {qsValue: 'по-тематике'},
            },
            pagination: {
                qsKey: 'страница',
            },
            searchQuery: {
                qsKey: 'запрос'
            },
            orientation: {
                straight: '',
                gay: '/геи',
                tranny: '/транссексуалы',
            },
        },
        tur: {
            routes: {
                archive: {label: 'arşiv'},
                allNiches: {section: 'tüm-gruplar'},
                niche: {section: 'tüm-gruplar'},
                allMovies: {section: 'tüm-sahneler'},
                pornstars: {section: 'modeller'},
                pornstar: {section: 'model'},
                favorite: {section: 'favori-videolar'},
                favoritePornstars: {section: 'favori-porno-yıldızları'},
                video: {section: 'video'},
                findVideos: {section: 'videoları-bul'},
            },
            redirects: {
                categories: {search: '?categories'},
                allMovies: {
                    from: {
                        straight: '/tüm-kanal-videoları.html',
                        gay: '/filmler.html',
                        tranny: '/sahneler.html',
                    }
                },
                pornstars: {from: '/porn-stars.html'},
                favorite: {from: '/your-favorite.html', fromMovies: '/your-favorite-movs.html'},
                favoritePornstars: {from: '/your-favorite-porn-stars.html'},
                video: {fromPfx: 'vid-', fromExt: '.htm'},
            },
            ordering: {
                qsKey: 'çeşit',
                byDate: {qsValue: 'son'},
                byDuration: {qsValue: 'en-uzun'},
                byPopularity: {qsValue: 'popüler'},
                byRelevant: {qsValue: 'uygun'},
            },
            pagination: {
                qsKey: 'sayfa',
            },
            searchQuery: {
                qsKey: 'sorgu'
            },
            orientation: {
                straight: '',
                gay: '/gayler',
                tranny: '/travestiler',
            },
        },
    }),

    frontRouterLocaleKeys = Object.freeze([
        'routes', 'ordering', 'pagination', 'searchQuery', 'orientation',
    ])

export const
    // localized router data with only needed branches for frontend
    frontRouterLocaleMapping =
        deepFreeze(Object.keys(mapping).reduce(
            (root, localeCode) => {
                const
                    branch = g(mapping, localeCode),

                    filteredBranch =
                        Object.keys(branch)
                        .filter(k => includes(frontRouterLocaleKeys, k))
                        .reduce((locale, k) => set(locale, k, g(branch, k)), {})

                return set(root, localeCode, filteredBranch)
            },
            {}
        ))

/*
    A helper which could be used during application initialization to validate locales from server
    with own data structure.
*/
export const validate = siteLocales => {
    // generating model of every language code received from backend
    const mappingModel = PropTypes.exact(
        siteLocales.reduce((obj, x) => set(obj, g(x, 'code'), g(ssrLocaleRouterModel, [])), {})
    )

    assertPropTypes(mappingModel, mapping, 'router-locale-mapping', 'validate')
}

export default mapping
