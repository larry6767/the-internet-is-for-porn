// WARNING! Some helper(s) depend(s) on this module, avoid recursive dependencies!
import {PropTypes} from 'src/App/helpers/propTypes'
import {ImmutablePropTypes} from 'src/App/helpers/propTypes/immutable'

import {
    immutableLocaleRouterModel,
    ssrImmutableLocaleRouterModel,
} from 'src/dev-modules/initialModels'

export {
    localeRouterModel, immutableLocaleRouterModel,
    i18nHeadersModel, immutableI18nHeadersModel,
    i18nSearchModel, immutableI18nSearchModel,
    i18nNavigationModel, immutableI18nNavigationModel,
    i18nOrderingModel, immutableI18nOrderingModel,
    i18nButtonsModel, immutableI18nButtonsModel,
    i18nFooterModel, immutableI18nFooterModel,
    i18nReportModel, immutableI18nReportModel,
    i18nPornstarInfoParametersModel, immutableI18nPornstarInfoParametersModel,
    i18nOrientationModel, immutableI18nOrientationModel,
    i18nModel, immutableI18nModel,
    ssrLocaleRouterModel, ssrImmutableLocaleRouterModel,
} from 'src/dev-modules/initialModels'

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
        'site',
        'notFound',
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
        },

    refModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.nullable(PropTypes.instanceOf(
            typeof Element === 'undefined' ? () => {} : Element // plug for SSR
        ))

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

    tagArchiveListModelBuilder = process.env.NODE_ENV === 'production' ? null : isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
            listOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf

        return listOf(exact({
            archiveDate: PropTypes.number,
            year: PropTypes.number,
            month: PropTypes.string,
            monthNumber: PropTypes.number,
            itemsCount: PropTypes.number,
            url: PropTypes.string,
        }))
    },

    sortListModelBuilder = process.env.NODE_ENV === 'production' ? null : isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
            listOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf

        return listOf(exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        }))
    },

    tagArchiveListOlderOrNewerModelBuilder = process.env.NODE_ENV === 'production' ? null :
        isImmutable => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                nullable = PropTypes.nullable

            return nullable(exact({
                month: PropTypes.string,
                year: PropTypes.string,
            }))
        },

    pornstarsListModelBuilder = process.env.NODE_ENV === 'production' ? null :
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
        },

    nichesListModelBuilder = process.env.NODE_ENV === 'production' ? null :
        (isImmutable, withThumb, withLetter) => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                listOf = isImmutable ? ImmutablePropTypes.listOf : PropTypes.arrayOf,

                props = {
                    id: PropTypes.number,
                    name: PropTypes.string,
                    subPage: PropTypes.string,
                    itemsCount: PropTypes.number,
                }

            if (withThumb)
                props.thumb = PropTypes.string

            if (withLetter)
                props.letter = PropTypes.string

            return listOf(exact(props))
        },

    pageTextModelBuilder = process.env.NODE_ENV === 'production' ? null :
        (isImmutable, isVideoPage = false) => {
            const
                exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact,
                props = {
                    title: PropTypes.string,
                    description: PropTypes.string,
                    keywords: PropTypes.string,
                    headerTitle: PropTypes.nullable(PropTypes.string),
                    headerDescription: PropTypes.string,
                    listHeader: PropTypes.nullable(PropTypes.string),
                    listHeaderEmpty: PropTypes.nullable(PropTypes.string),
                }

            return isVideoPage ? exact({
                ...props,
                galleryTitle: PropTypes.string,
            }) : exact(props)
        }

export const
    archiveFilmsModel = process.env.NODE_ENV === 'production' ? null :
        archiveFilmsModelBuilder(false),
    immutableArchiveFilmsModel = process.env.NODE_ENV === 'production' ? null :
        archiveFilmsModelBuilder(true),

    tagArchiveListModel = process.env.NODE_ENV === 'production' ? null :
        tagArchiveListModelBuilder(false),
    immutableTagArchiveListModel = process.env.NODE_ENV === 'production' ? null :
        tagArchiveListModelBuilder(true),

    sortListModel = process.env.NODE_ENV === 'production' ? null :
        sortListModelBuilder(false),
    immutableSortListModel = process.env.NODE_ENV === 'production' ? null :
        sortListModelBuilder(true),

    tagArchiveListOlderOrNewerModel = process.env.NODE_ENV === 'production' ? null :
        tagArchiveListOlderOrNewerModelBuilder(false),
    immutableTagArchiveListOlderOrNewerModel = process.env.NODE_ENV === 'production' ? null :
        tagArchiveListOlderOrNewerModelBuilder(true),


    immutablePageTextModel = process.env.NODE_ENV === 'production' ? null :
        pageTextModelBuilder(true),
    immutableVideoPageTextModel = process.env.NODE_ENV === 'production' ? null :
        pageTextModelBuilder(true, true),

    pornstarsListModel = process.env.NODE_ENV === 'production' ? null :
        pornstarsListModelBuilder(false, false),
    pornstarsListWithLetterModel = process.env.NODE_ENV === 'production' ? null :
        pornstarsListModelBuilder(false, true),
    immutablePornstarsListModel = process.env.NODE_ENV === 'production' ? null :
        pornstarsListModelBuilder(true, false),
    immutablePornstarsListWithLetterModel = process.env.NODE_ENV === 'production' ? null :
        pornstarsListModelBuilder(true, true),

    nichesListModel = process.env.NODE_ENV === 'production' ? null :
        nichesListModelBuilder(false, false, false),
    nichesListWithThumbModel = process.env.NODE_ENV === 'production' ? null :
        nichesListModelBuilder(false, true, false),
    nichesListWithLetterModel = process.env.NODE_ENV === 'production' ? null :
        nichesListModelBuilder(false, false, true),
    immutableNichesListModel = process.env.NODE_ENV === 'production' ? null :
        nichesListModelBuilder(true, false, false),
    immutableNichesListWithThumbModel = process.env.NODE_ENV === 'production' ? null :
        nichesListModelBuilder(true, true, false),
    immutableNichesListWithLetterModel = process.env.NODE_ENV === 'production' ? null :
        nichesListModelBuilder(true, false, true),

    pageRequestParamsModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            orientationCode: PropTypes.string,
            child: PropTypes.nullable(PropTypes.string),
            subchild: PropTypes.nullable(PropTypes.string),
            ordering: PropTypes.nullable(PropTypes.string),
            pagination: PropTypes.nullable(PropTypes.number),

            archive: PropTypes.nullable(ImmutablePropTypes.exact({
                year: PropTypes.number,
                month: PropTypes.number,
            })),

            searchQuery: PropTypes.nullable(PropTypes.string),
            isSitePage: PropTypes.nullable(PropTypes.bool),
        })
