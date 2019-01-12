import {PropTypes, ImmutablePropTypes} from './helpers'

const
    localeRouterModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            routes: exact({
                archive: exact({label: PropTypes.string}),
                allNiches: exact({section: PropTypes.string}),
                niche: exact({section: PropTypes.string}),
                allMovies: exact({section: PropTypes.string}),
                pornstars: exact({section: PropTypes.string}),
                pornstar: exact({section: PropTypes.string}),
                favorite: exact({section: PropTypes.string}),
                favoritePornstars: exact({section: PropTypes.string}),
                video: exact({sectionPfx: PropTypes.string}),
            }),
            redirects: exact({
                categories: exact({search: PropTypes.string}),
                allMovies: exact({from: PropTypes.string}),
                pornstars: exact({from: PropTypes.string}),
                favorite: exact({
                    from: PropTypes.string,
                    fromMovies: PropTypes.string,
                }),
                favoritePornstars: exact({from: PropTypes.string}),
                video: exact({
                    fromPfx: PropTypes.string,
                    fromExt: PropTypes.string,
                }),
            }),
        })
    }

export const
    localeRouterModel = localeRouterModelBuilder(false),
    immutableLocaleRouterModel = localeRouterModelBuilder(true),

    routerLocationModel = ImmutablePropTypes.exact({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: ImmutablePropTypes.shape({}).isOptional,
        key: PropTypes.string.isOptional,
    })
