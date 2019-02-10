import {set} from 'lodash'

import {PropTypes} from './propTypes'
import {ImmutablePropTypes} from './propTypes/immutable'

const
    localeRouterModelBuilder = (isImmutable, isSSR) => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,

            props = {
                routes: exact({
                    archive: exact({label: PropTypes.string}),
                    allNiches: exact({section: PropTypes.string}),
                    niche: exact({section: PropTypes.string}),
                    allMovies: exact({section: PropTypes.string}),
                    pornstars: exact({section: PropTypes.string}),
                    pornstar: exact({section: PropTypes.string}),
                    favorite: exact({section: PropTypes.string}),
                    favoritePornstars: exact({section: PropTypes.string}),
                    video: exact({section: PropTypes.string}),
                    findVideos: exact({section: PropTypes.string}),
                    site: exact({section: PropTypes.string})
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
                searchQuery: exact({
                    qsKey: PropTypes.string,
                }),
                orientation: exact({
                    straight: PropTypes.string,
                    gay: PropTypes.string,
                    tranny: PropTypes.string,
                }),
            }

        return exact(!isSSR ? props : set(props, 'redirects', exact({
            categories: exact({search: PropTypes.string}),
            allMovies: exact({
                from: exact({
                    straight: PropTypes.string,
                    gay: PropTypes.string,
                    tranny: PropTypes.string,
                }),
            }),
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
        })))
    },

    i18nLabelsModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            providedBy: PropTypes.string,
            showing: PropTypes.string,
        })
    },

    i18nHeadersModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            allNiches: PropTypes.string,
            niches: PropTypes.string,
            listNiches: PropTypes.string,
            listArchive: PropTypes.string,
            pornstars: PropTypes.string,
            relatedVideo: PropTypes.string,
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
            prev: PropTypes.string,
            next: PropTypes.string,
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

    i18nReportModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            title: PropTypes.string,
            duration: PropTypes.string,
            added: PropTypes.string,
            hosted: PropTypes.string,
            found: PropTypes.string,
            on: PropTypes.string,
            radioLabel: PropTypes.string,
            radioButtons: exact({
                other: PropTypes.string,
                deleted: PropTypes.string,
                doesntPlay: PropTypes.string,
                badThumb: PropTypes.string,
                young: PropTypes.string,
                incest: PropTypes.string,
                animals: PropTypes.string,
                otherScat: PropTypes.string,
                copyright: PropTypes.string,
            }),
            text: PropTypes.string,
            succesText: PropTypes.string,
            failureText: PropTypes.string,
            commentLabel: PropTypes.string,
            commentPlaceholder: PropTypes.string,
        })
    },

    i18nPornstarInfoParametersBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            alias: PropTypes.string,
            astrologicalSign: PropTypes.string,
            bodyHair: PropTypes.string,
            boobsFake: PropTypes.string,
            breast: PropTypes.string,
            breastSizeType: PropTypes.string,
            city: PropTypes.string,
            colorEye: PropTypes.string,
            colorHair: PropTypes.string,
            country: PropTypes.string,
            cupSize: PropTypes.string,
            ethnicity: PropTypes.string,
            extra: PropTypes.string,
            height: PropTypes.string,
            hip: PropTypes.string,
            name: PropTypes.string,
            physiqueCustom: PropTypes.string,
            piercings: PropTypes.string,
            profession: PropTypes.string,
            sexualRole: PropTypes.string,
            shoeSize: PropTypes.string,
            tatoos: PropTypes.string,
            waist: PropTypes.string,
            weight: PropTypes.string,
            birthday: PropTypes.string,
            lifetime: PropTypes.string,
            careerTime: PropTypes.string,
            penis: PropTypes.string,
        })
    },

    i18nOrientationModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            straight: PropTypes.string,
            gay: PropTypes.string,
            tranny: PropTypes.string,
        })
    },

    i18nLabelsModel = i18nLabelsModelBuilder(false),
    immutableI18nLabelsModel = i18nLabelsModelBuilder(true),

    i18nHeadersModel = i18nHeadersModelBuilder(false),
    immutableI18nHeadersModel = i18nHeadersModelBuilder(true),

    i18nSearchModel = i18nSearchModelBuilder(false),
    immutableI18nSearchModel = i18nSearchModelBuilder(true),

    i18nNavigationModel = i18nNavigationModelBuilder(false),
    immutableI18nNavigationModel = i18nNavigationModelBuilder(true),

    i18nOrderingModel = i18nOrderingModelBuilder(false),
    immutableI18nOrderingModel = i18nOrderingModelBuilder(true),

    i18nButtonsModel = i18nButtonsModelBuilder(false),
    immutableI18nButtonsModel = i18nButtonsModelBuilder(true),

    i18nFooterModel = i18nFooterModelBuilder(false),
    immutableI18nFooterModel = i18nFooterModelBuilder(true),

    i18nReportModel = i18nReportModelBuilder(false),
    immutableI18nReportModel = i18nReportModelBuilder(true),

    i18nPornstarInfoParametersModel = i18nPornstarInfoParametersBuilder(false),
    immutableI18nPornstarInfoParametersModel = i18nPornstarInfoParametersBuilder(true),

    i18nOrientationModel = i18nOrientationModelBuilder(false),
    immutableI18nOrientationModel = i18nOrientationModelBuilder(true),

    i18nModelBuilder = isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            labels: isImmutable ? immutableI18nLabelsModel : i18nLabelsModel,
            headers: isImmutable ? immutableI18nHeadersModel : i18nHeadersModel,
            search: isImmutable ? immutableI18nSearchModel : i18nSearchModel,
            navigation: isImmutable ? immutableI18nNavigationModel : i18nNavigationModel,
            ordering: isImmutable ? immutableI18nOrderingModel : i18nOrderingModel,
            buttons: isImmutable ? immutableI18nButtonsModel : i18nButtonsModel,
            footer: isImmutable ? immutableI18nFooterModel : i18nFooterModel,
            report: isImmutable ? immutableI18nReportModel : i18nReportModel,
            pornstarInfoParameters: isImmutable
                ? immutableI18nPornstarInfoParametersModel
                : i18nPornstarInfoParametersModel,
            orientation: isImmutable ? immutableI18nOrientationModel : i18nOrientationModel,
        })
    }

export {
    i18nLabelsModel, immutableI18nLabelsModel,
    i18nHeadersModel, immutableI18nHeadersModel,
    i18nSearchModel, immutableI18nSearchModel,
    i18nNavigationModel, immutableI18nNavigationModel,
    i18nOrderingModel, immutableI18nOrderingModel,
    i18nButtonsModel, immutableI18nButtonsModel,
    i18nFooterModel, immutableI18nFooterModel,
    i18nReportModel, immutableI18nReportModel,
    i18nPornstarInfoParametersModel, immutableI18nPornstarInfoParametersModel,
    i18nOrientationModel, immutableI18nOrientationModel,
}

export const
    localeRouterModel = localeRouterModelBuilder(false, false),
    immutableLocaleRouterModel = localeRouterModelBuilder(true, false),
    ssrLocaleRouterModel = localeRouterModelBuilder(false, true),
    ssrImmutableLocaleRouterModel = localeRouterModelBuilder(true, true),

    i18nModel = i18nModelBuilder(false),
    immutableI18nModel = i18nModelBuilder(true)
