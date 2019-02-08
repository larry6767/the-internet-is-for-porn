import {Record} from 'immutable'
import {ImmutablePropTypes, PropTypes} from '../../helpers'

import {
    immutablePageTextModel,
    immutableModelsListWithLetterModel,
    pageRequestParamsModel,
} from '../../models'

import {immutableVideoItemModel} from '../../../generic/VideoItem/models'

const
    pornstarInfoForTableModelBuilder = process.env.NODE_ENV === 'production' ? null :
        (isImmutable) => {
            const
                exact = isImmutable ? ImmutablePropTypes.exactRecordOf : PropTypes.exact,
                nullable = PropTypes.nullable,

                props = {
                    alias: nullable(PropTypes.string),
                    astrologicalSign: nullable(PropTypes.number),
                    bodyHair: nullable(PropTypes.string),
                    boobsFake: nullable(PropTypes.number),
                    breast: nullable(PropTypes.number),
                    breastSizeType: nullable(PropTypes.number), // shemale
                    city: nullable(PropTypes.string),
                    colorEye: nullable(PropTypes.string),
                    colorHair: nullable(PropTypes.string),
                    country: nullable(PropTypes.string),
                    cupSize: nullable(PropTypes.string),
                    ethnicity: nullable(PropTypes.string),
                    extra: nullable(PropTypes.string),
                    height: nullable(PropTypes.number),
                    hip: nullable(PropTypes.number),
                    name: nullable(PropTypes.string),
                    physiqueCustom: nullable(PropTypes.string),
                    piercings: nullable(PropTypes.string),
                    profession: nullable(PropTypes.string),
                    sexualRole: nullable(PropTypes.number),
                    shoeSize: nullable(PropTypes.number),
                    tatoos: nullable(PropTypes.string),
                    waist: nullable(PropTypes.number),
                    weight: nullable(PropTypes.number),


                    birthday: nullable(exact({
                        dateBirthD: PropTypes.number,
                        dateBirthM: PropTypes.number,
                        dateBirthY: PropTypes.number,
                    })),

                    lifetime: nullable(exact({
                        dateBirth: PropTypes.number,
                        dateDeath: PropTypes.number,
                    })),

                    careerTime: nullable(exact({
                        dateCareerBegin: PropTypes.number,
                        dateCareerEnd: PropTypes.number,
                    })),

                    penis: nullable(exact({ // gay
                        penisCircumcision: PropTypes.number,
                        penisSize: PropTypes.number,
                        penisSizeType: PropTypes.number,
                    })),
                }

            return exact(props)
        },

    pornstarInfoModelBuilder = process.env.NODE_ENV === 'production' ? null :
        (isImmutable) => {
            const
                exact = isImmutable ? ImmutablePropTypes.exactRecordOf : PropTypes.exact,

                props = {
                    id: PropTypes.number,
                    // idTag: PropTypes.number,
                    // thumbPath: PropTypes.string,
                    thumbUrl: PropTypes.string,
                    // urlGalleries: PropTypes.string,
                }

            return exact(props)
        }

export const
    pornstarInfoForTableModel = process.env.NODE_ENV === 'production' ? null :
        pornstarInfoForTableModelBuilder(false),

    pornstarInfoModel = process.env.NODE_ENV === 'production' ? null :
        pornstarInfoModelBuilder(false),

    PornstarInfoForTableRecord = Record({
        alias: null,
        astrologicalSign: null,
        bodyHair: null,
        boobsFake: null,
        breast: null,
        breastSizeType: null, // shemale
        city: null,
        colorEye: null,
        colorHair: null,
        country: null,
        cupSize: null,
        ethnicity: null,
        extra: null,
        height: null,
        hip: null,
        name: null,
        physiqueCustom: null,
        piercings: null,
        profession: null,
        sexualRole: null,
        shoeSize: null,
        tatoos: null,
        waist: null,
        weight: null,

        birthday: null,

        lifetime: null,

        careerTime: null,

        penis: null,
    }),

    PornstarInfoRecord = Record({
        id: 0,
        thumbUrl: '',
    })

const
    immutablePornstarInfoForTableModel = process.env.NODE_ENV === 'production' ? null :
        pornstarInfoForTableModelBuilder(true),

    immutablePornstarInfoModel = process.env.NODE_ENV === 'production' ? null :
        pornstarInfoModelBuilder(true),

    model = process.env.NODE_ENV === 'production' ? null : {
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        modelInfoIsOpen: PropTypes.bool,
        lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),
        pageNumber: PropTypes.number,
        pageText: immutablePageTextModel,
        pagesCount: PropTypes.number,
        sortList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        })),
        currentSort: PropTypes.nullable(PropTypes.string),
        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
        modelsList: immutableModelsListWithLetterModel,
        pornstarInfoForTable: immutablePornstarInfoForTableModel,
        pornstarInfo: immutablePornstarInfoModel,
    },

    stateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact(model),

    dataModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exactRecordOf(model)

export {
    stateModel,
    dataModel,
}
