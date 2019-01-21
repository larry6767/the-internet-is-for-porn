import {Record} from 'immutable'

import {PropTypes, ImmutablePropTypes} from './helpers'

import {
    immutableLocaleRouterModel,
    ssrImmutableLocaleRouterModel,
} from '../dev-modules/initialModels'

export {
    localeRouterModel, immutableLocaleRouterModel,
    i18nSearchModel, immutableI18nSearchModel,
    i18nNavigationModel, immutableI18nNavigationModel,
    i18nAllNichesModel, immutableI18nAllNichesModel,
    i18nOrderingModel, immutableI18nOrderingModel,
    i18nButtonsModel, immutableI18nButtonsModel,
    i18nFooterModel, immutableI18nFooterModel,
    i18nReportModel, immutableI18nReportModel,
    i18nOrientationModel, immutableI18nOrientationModel,
    i18nModel, immutableI18nModel,
    ssrLocaleRouterModel, ssrImmutableLocaleRouterModel,
} from '../dev-modules/initialModels'

const
    routerContextModelBuilder = process.env.NODE_ENV === 'production' ? null : isSSR =>
        ImmutablePropTypes.exactRecordOf({
            location: routerLocationModel,
            router: isSSR ? ssrImmutableLocaleRouterModel : immutableLocaleRouterModel,
            currentOrientation: PropTypes.oneOf(orientationCodes),
            ssr: !isSSR ? PropTypes.null : ImmutablePropTypes.exactRecordOf({
                legacyOrientationPrefixes: legacyOrientationPrefixesModel,
                localeCode: PropTypes.string,
            }),
        })

export const
    pageKeys = Object.freeze([
        'home',
        'allNiches',
        'niche',
        'allMovies',
        'pornstars',
        'pornstar',
        'favorite',
        'favoritePornstars',
        'video',
        'findVideos',
    ]),

    orientationCodes = Object.freeze(['straight', 'gay', 'tranny']),
    defaultOrientationCode = orientationCodes[0],

    legacyOrientationPrefixesModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            straight: PropTypes.string,
            gay: PropTypes.string,
            tranny: PropTypes.string,
        }),

    routerLocationModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            hash: PropTypes.string,
            pathname: PropTypes.string,
            search: PropTypes.string,
            state: ImmutablePropTypes.shape({}).isOptional,
            key: PropTypes.string.isOptional,
        }),

    routerContextModel = process.env.NODE_ENV === 'production' ? null :
        routerContextModelBuilder(false),
    ssrRouterContextModel = process.env.NODE_ENV === 'production' ? null :
        routerContextModelBuilder(true),

    // year+month like `201901` where `2019` is year and `01` is month
    archiveIdReg = /^(\d{4})(\d{2})$/,

    archiveIdModel = process.env.NODE_ENV === 'production' ? null :
        (props, propName, componentName) => {
            if (typeof props[propName] !== 'number')
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it's not a number but ${typeof props[propName]}). Validation failed.`
                )
            if (!archiveIdReg.test(String(props[propName])))
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\` ` +
                    `(it doesn't match proper archive id format). Validation failed.`
                )
        }

const
    archiveFilmsModelBuilder = process.env.NODE_ENV === 'production' ? null : isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            currentlyActiveId: PropTypes.nullable(archiveIdModel),
            year: PropTypes.number,
            month: PropTypes.number,
        })
    },

    modelsListModelBuilder = process.env.NODE_ENV === 'production' ? null :
        (isImmutable, withLetter) => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                listOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf,

                props = {
                    id: PropTypes.number,
                    name: PropTypes.string,
                    subPage: PropTypes.string,
                    itemsCount: PropTypes.number,
                    thumb: PropTypes.string,
                }

            if (withLetter)
                props.letter = PropTypes.string

            return listOf(exact(props))
        }

export const
    archiveFilmsModel = process.env.NODE_ENV === 'production' ? null :
        archiveFilmsModelBuilder(false),
    immutableArchiveFilmsModel = process.env.NODE_ENV === 'production' ? null :
        archiveFilmsModelBuilder(true),

    immutablePageTextModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exactRecordOf({
            description: PropTypes.string,
            headerDescription: PropTypes.string,
            headerTitle: PropTypes.nullable(PropTypes.string),
            keywords: PropTypes.string,
            listHeader: PropTypes.nullable(PropTypes.string),
            listHeaderEmpty: PropTypes.nullable(PropTypes.string),
            title: PropTypes.string,
        }),

    PageTextRecord = Record({
        description: '',
        headerDescription: '',
        headerTitle: null,
        keywords: '',
        listHeader: null,
        listHeaderEmpty: null,
        title: '',
    }),

    modelsListModel = process.env.NODE_ENV === 'production' ? null :
        modelsListModelBuilder(false, false),
    modelsListWithLetterModel = process.env.NODE_ENV === 'production' ? null :
        modelsListModelBuilder(false, true),
    immutableModelsListModel = process.env.NODE_ENV === 'production' ? null :
        modelsListModelBuilder(true, false),
    immutableModelsListWithLetterModel = process.env.NODE_ENV === 'production' ? null :
        modelsListModelBuilder(true, true)
