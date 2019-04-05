import {padStart, difference} from 'lodash'
import queryString from 'query-string'

// local libs
// WARNING! Some helper(s) depend(s) on this module, avoid recursive dependencies!
import g from 'src/App/helpers/plain/provedGet'
import ig from 'src/App/helpers/immutable/provedGet'
import {PropTypes} from 'src/App/helpers/propTypes'
import {assertPropTypes} from 'src/App/helpers/propTypes/check'

const
    getQs = r => queryString.parse(ig(r, 'location', 'search')),

    renderQs = qs => g(Object.keys(qs), 'length') > 0 ? `?${
        queryString.stringify(qs).replace(/%2B/g, '+').replace(/%20/g, '+')}` : '',

    prepareQsParamsModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.exact({
            ordering: PropTypes.string.isOptional,
            pagination: PropTypes.number.isOptional,
            searchQuery: PropTypes.string.isOptional,
            sponsor: PropTypes.string.isOptional,
            duration: PropTypes.string.isOptional,
        }),

    allowedQsKeysModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.arrayOf(PropTypes.oneOf([
            'ordering',
            'pagination',
            'searchQuery',
            'sponsor',
            'duration',
        ])),

    prepareQs = (r, qsParams, allowedQsKeys = []) => {
        const
            customAllowedQsKeysModel = process.env.NODE_ENV === 'production' ? null :
                PropTypes.arrayOf(PropTypes.oneOf(allowedQsKeys))

        if (process.env.NODE_ENV !== 'production') {
            assertPropTypes(
                customAllowedQsKeysModel,
                Object.keys(qsParams),
                'prepareQs',
                'qsParams'
            )
            assertPropTypes(
                allowedQsKeysModel,
                allowedQsKeys,
                'prepareQs',
                'allowedQsKeys'
            )
            assertPropTypes(
                prepareQsParamsModel,
                qsParams,
                'prepareQs',
                'qsParams'
            )
        }

        const
            qs = getQs(r),
            localizedAllowedQsKeys = allowedQsKeys.map(x => ig(r, 'router', x, 'qsKey')),
            localizedNotAllowedQsKeys = difference(Object.keys(qs), localizedAllowedQsKeys)

        localizedNotAllowedQsKeys.forEach(x => {
            delete qs[x]
        })

        if (qsParams.hasOwnProperty('ordering')) {
            const
                ordering = g(qsParams, 'ordering'),
                qsKey = ig(r, 'router', 'ordering', 'qsKey')

            qs[qsKey] = ig(r, 'router', 'ordering', ordering, 'qsValue')
        }

        if (qsParams.hasOwnProperty('pagination') && g(qsParams, 'pagination') !== null) {
            const
                pagination = g(qsParams, 'pagination'),
                qsKey = ig(r, 'router', 'pagination', 'qsKey')

            qs[qsKey] = pagination
        }

        if (qsParams.hasOwnProperty('searchQuery')) {
            const
                searchQuery = g(qsParams, 'searchQuery'),
                qsKey = ig(r, 'router', 'searchQuery', 'qsKey')

            qs[qsKey] = searchQuery
        }

        if (qsParams.hasOwnProperty('sponsor')) {
            const
                sponsor = g(qsParams, 'sponsor'),
                qsKey = ig(r, 'router', 'sponsor', 'qsKey')

            qs[qsKey] = sponsor !== 'all' ? sponsor :
                ig(r, 'router', 'sponsor', sponsor, 'qsValue')
        }

        if (qsParams.hasOwnProperty('duration')) {
            const
                duration = g(qsParams, 'duration'),
                qsKey = ig(r, 'router', 'duration', 'qsKey')

            qs[qsKey] = duration
        }

        return qs
    }

const
    // The `r` argument is this store branch: `app.locale.router`.
    routerGetters = Object.freeze({
        home: Object.freeze({
            path: (r, orientationCode) => {
                const orientationPfx = ig(r, 'router', 'orientation', orientationCode)
                return `${orientationPfx}/`
            },
            link: r => {
                const orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation'))
                return `${orientationPfx}/`
            },
        }),

        allNiches: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    allNiches = ig(r, 'router', 'routes', 'allNiches', 'section')

                return `${orientationPfx}/${allNiches}`
            },
            link: r => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    allNiches = ig(r, 'router', 'routes', 'allNiches', 'section')

                return `${orientationPfx}/${allNiches}`
            },
        }),
        niche: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    niche = ig(r, 'router', 'routes', 'niche', 'section')

                return `${orientationPfx}/${niche}/:child`
            },
            link: (r, child, qsParams={/*ordering:'…', sponsor: '…', pagination:1*/}, allowedQsKeys) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    niche = ig(r, 'router', 'routes', 'niche', 'section'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                return `${orientationPfx}/${niche}/${child}${renderQs(qs)}`
            },
        }),
        nicheArchive: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    niche = ig(r, 'router', 'routes', 'niche', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label')

                return `${orientationPfx}/${niche}/:child/${archive}/(\\d{4})-(\\d{2})`
            },
            link: (
                r, child, year, month, qsParams={/*ordering:'…', pagination:1*/}, allowedQsKeys
            ) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    niche = ig(r, 'router', 'routes', 'niche', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                year = padStart(year, 4, '0')
                month = padStart(month, 2, '0')
                return `${orientationPfx
                    }/${niche}/${child}/${archive}/${year}-${month}${renderQs(qs)}`
            }
        }),

        allMovies: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    allMovies = ig(r, 'router', 'routes', 'allMovies', 'section')

                return `${orientationPfx}/${allMovies}`
            },
            link: (r, qsParams={/*ordering:'…', pagination:1*/}, allowedQsKeys) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    allMovies = ig(r, 'router', 'routes', 'allMovies', 'section'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                return `${orientationPfx}/${allMovies}${renderQs(qs)}`
            },
        }),
        allMoviesArchive: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    allMovies = ig(r, 'router', 'routes', 'allMovies', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label')

                return `${orientationPfx}/${allMovies}/${archive}/(\\d{4})-(\\d{2})`
            },
            link: (r, year, month, qsParams={/*ordering:'…', pagination:1*/}, allowedQsKeys) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    allMovies = ig(r, 'router', 'routes', 'allMovies', 'section'),
                    archive = ig(r, 'router', 'routes', 'archive', 'label'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                year = padStart(year, 4, '0')
                month = padStart(month, 2, '0')
                return `${orientationPfx}/${allMovies}/${archive}/${year}-${month}${renderQs(qs)}`
            },
        }),

        pornstars: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    pornstars = ig(r, 'router', 'routes', 'pornstars', 'section')

                return `${orientationPfx}/${pornstars}`
            },
            link: r => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    pornstars = ig(r, 'router', 'routes', 'pornstars', 'section')

                return `${orientationPfx}/${pornstars}`
            },
        }),
        pornstar: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    pornstar = ig(r, 'router', 'routes', 'pornstar', 'section')

                return `${orientationPfx}/${pornstar}/:child`
            },
            link: (r, child, qsParams={/*ordering:'…', pagination:1*/}, allowedQsKeys) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    pornstar = ig(r, 'router', 'routes', 'pornstar', 'section'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                return `${orientationPfx}/${pornstar}/${child}${renderQs(qs)}`
            },
        }),

        // there's no routes for specific orientations for favorite pages for now
        favorite: Object.freeze({
            path: r => {
                const favorite = ig(r, 'router', 'routes', 'favorite', 'section')
                return `/${favorite}`
            },
            link: (r, qsParams={/*ordering:'…', pagination:1*/}, allowedQsKeys) => {
                const
                    favorite = ig(r, 'router', 'routes', 'favorite', 'section'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                return `/${favorite}${renderQs(qs)}`
            },
        }),
        favoritePornstars: Object.freeze({
            path: r => {
                const favoritePornstars = ig(r, 'router', 'routes', 'favoritePornstars', 'section')
                return `/${favoritePornstars}`
            },
            link: (r, qsParams={/*ordering:'…', pagination:1*/}, allowedQsKeys) => {
                const
                    favoritePornstars = ig(r, 'router', 'routes', 'favoritePornstars', 'section'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                return `/${favoritePornstars}${renderQs(qs)}`
            },
        }),

        video: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    video = ig(r, 'router', 'routes', 'video', 'section')

                return `${orientationPfx}/${video}/:child/:subchild`
            },
            link: (r, videoId, title) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    video = ig(r, 'router', 'routes', 'video', 'section')

                return `${orientationPfx}/${video}/${videoId}/${title.replace(/ /g, '-')
                    .replace(/\./g, '').replace(/%/g, '').replace(/-+/g, '-')}`
            },
        }),

        findVideos: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    findVideos = ig(r, 'router', 'routes', 'findVideos', 'section')

                return `${orientationPfx}/${findVideos}`
            },
            link: (r, qsParams={
                /*ordering:'…', pagination:1, searchQuery:'', changeOrientation: ''*/
            }, allowedQsKeys, changeOrientation = null) => {
                const
                    orientationPfx = ! changeOrientation
                        ? ig(r, 'router', 'orientation', ig(r, 'currentOrientation'))
                        : ig(r, 'router', 'orientation', changeOrientation),
                    findVideos = ig(r, 'router', 'routes', 'findVideos', 'section'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                return `${orientationPfx}/${findVideos}${renderQs(qs)}`
            },
        }),

        site: Object.freeze({
            path: (r, orientationCode) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', orientationCode),
                    site = ig(r, 'router', 'routes', 'site', 'section')

                return `${orientationPfx}/${site}/:child`
            },
            link: (r, child, qsParams={/*ordering:'…', pagination:1*/}, allowedQsKeys) => {
                const
                    orientationPfx = ig(r, 'router', 'orientation', ig(r, 'currentOrientation')),
                    site = ig(r, 'router', 'routes', 'site', 'section'),
                    qs = qsParams === null ? {} : prepareQs(r, qsParams, allowedQsKeys)

                return `${orientationPfx}/${site}/${child}${renderQs(qs)}`
            },
        }),

        notFound: Object.freeze({
            path: () => '*',
            link: () => '*',
        }),
    })

const
    getterModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        path: PropTypes.func,
        link: PropTypes.func,
    }),

    routerGettersModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        home: getterModel,

        allNiches: getterModel,
        niche: getterModel,
        nicheArchive: getterModel,

        allMovies: getterModel,
        allMoviesArchive: getterModel,

        pornstars: getterModel,
        pornstar: getterModel,

        favorite: getterModel,
        favoritePornstars: getterModel,

        video: getterModel,

        findVideos: getterModel,

        site: getterModel,

        notFound: getterModel,
    })

if (process.env.NODE_ENV !== 'production')
    assertPropTypes(routerGettersModel, routerGetters, 'routerGetters', 'routerGetters')

export default routerGetters
