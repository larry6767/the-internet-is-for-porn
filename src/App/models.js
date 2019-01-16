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
                findVideos: exact({section: PropTypes.string}),
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
            ordering: exact({
                qsKey: PropTypes.string,
                byDate: exact({qsValue: PropTypes.string}),
                byDuration: exact({qsValue: PropTypes.string}),
                byPopularity: exact({qsValue: PropTypes.string}),
                byRelevant: exact({qsValue: PropTypes.string}),
            }),
            pagination: exact({
                qsKey: PropTypes.string,
            }),
        })
    },

    i18nSearchModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            inputPlaceholder: PropTypes.string,
            buttonTitle: PropTypes.string,
        })
    },

    i18nNavigationModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
            navigationItem = exact({title: PropTypes.string})

        return exact({
            home: navigationItem,
            allNiches: navigationItem,
            allMovies: navigationItem,
            pornstars: navigationItem,
            favorite: navigationItem,
        })
    },

    i18nAllNichesModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            pageHeader: PropTypes.string,
        })
    },

    i18nOrderingModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            label: PropTypes.string,
            byDate: PropTypes.string,
            byDuration: PropTypes.string,
            byPopularity: PropTypes.string,
            byRelevant: PropTypes.string,
        })
    },

    i18nButtonsModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            report: PropTypes.string,
            favoriteMovies: PropTypes.string,
            favoritePornstars: PropTypes.string,
            archive: PropTypes.string,
            previousMonth: PropTypes.string,
            nextMonth: PropTypes.string,
            topFilms: PropTypes.string,
            backToMainPage: PropTypes.string,
            addToFavorite: PropTypes.string,
            removeFromFavorite: PropTypes.string,
            cancel: PropTypes.string,
        })
    },

    i18nFooterModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            forParents: PropTypes.string,
            disclaimer: PropTypes.string,
        })
    },

    i18nSearchModel = i18nSearchModelBuilder(false),
    immutableI18nSearchModel = i18nSearchModelBuilder(true),

    i18nNavigationModel = i18nNavigationModelBuilder(false),
    immutableI18nNavigationModel = i18nNavigationModelBuilder(true),

    i18nAllNichesModel = i18nAllNichesModelBuilder(false),
    immutableI18nAllNichesModel = i18nAllNichesModelBuilder(true),

    i18nOrderingModel = i18nOrderingModelBuilder(false),
    immutableI18nOrderingModel = i18nOrderingModelBuilder(true),

    i18nButtonsModel = i18nButtonsModelBuilder(false),
    immutableI18nButtonsModel = i18nButtonsModelBuilder(true),

    i18nFooterModel = i18nFooterModelBuilder(false),
    immutableI18nFooterModel = i18nFooterModelBuilder(true),

    i18nModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            search: isImmutable ? immutableI18nSearchModel : i18nSearchModel,
            navigation: isImmutable ? immutableI18nNavigationModel : i18nNavigationModel,
            allNiches: isImmutable ? immutableI18nAllNichesModel : i18nAllNichesModel,
            ordering: isImmutable ? immutableI18nOrderingModel : i18nOrderingModel,
            buttons: isImmutable ? immutableI18nButtonsModel : i18nButtonsModel,
            footer: isImmutable ? immutableI18nFooterModel : i18nFooterModel,
        })
    }

export {
    i18nSearchModel, immutableI18nSearchModel,
    i18nNavigationModel, immutableI18nNavigationModel,
    i18nAllNichesModel, immutableI18nAllNichesModel,
    i18nOrderingModel, immutableI18nOrderingModel,
    i18nButtonsModel, immutableI18nButtonsModel,
    i18nFooterModel, immutableI18nFooterModel,
}

export const
    localeRouterModel = localeRouterModelBuilder(false),
    immutableLocaleRouterModel = localeRouterModelBuilder(true),

    i18nModel = i18nModelBuilder(false),
    immutableI18nModel = i18nModelBuilder(true),

    routerLocationModel = ImmutablePropTypes.exact({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: ImmutablePropTypes.shape({}).isOptional,
        key: PropTypes.string.isOptional,
    }),

    routerContextModel = ImmutablePropTypes.exactRecordOf({
        location: routerLocationModel,
        router: immutableLocaleRouterModel,
    })
