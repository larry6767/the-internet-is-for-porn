import {mapValues} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../../../App/helpers'

const
    pornstarInfoModelProps = process.env.NODE_ENV === 'production' ? null : Object.freeze({
        // these parameters below are needed for the table
        alias: PropTypes.string,
        astrological_sign: PropTypes.string,
        body_hair: PropTypes.string,
        boobs_fake: PropTypes.string,
        breast: PropTypes.string,
        breast_size_type: PropTypes.string, // shemale
        city: PropTypes.string,
        color_eye: PropTypes.string,
        color_hair: PropTypes.string,
        country: PropTypes.string,
        cup_size: PropTypes.string,
        ethnicity: PropTypes.string,
        extra: PropTypes.string,
        height: PropTypes.string,
        hip: PropTypes.string,
        name: PropTypes.string,
        physique_custom: PropTypes.string,
        piercings: PropTypes.string,
        profession: PropTypes.string,
        sexual_role: PropTypes.string,
        shoe_size: PropTypes.string,
        tatoos: PropTypes.string,
        waist: PropTypes.string,
        weight: PropTypes.string,

        dt_birth_d: PropTypes.string,
        dt_birth_m: PropTypes.string,
        dt_birth_y: PropTypes.string,

        dt_birth: PropTypes.string,
        dt_death: PropTypes.string,

        dt_career_begin: PropTypes.string,
        dt_career_end: PropTypes.string,

        penis_circumcision: PropTypes.string, // gay
        penis_size: PropTypes.string, // gay
        penis_size_type: PropTypes.string, // gay

        // these parameters below are needed for other components
        id: PropTypes.string,
        // id_tag: PropTypes.string,
        // thumb_path: PropTypes.string,
        thumb_url: PropTypes.string,
        // url_galleries: PropTypes.string,
    })

export const
    incomingPornstarInfoModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.shape(pornstarInfoModelProps),

    // result model
    pornstarInfoForTableModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        alias: PropTypes.nullable(PropTypes.string),
        astrologicalSign: PropTypes.nullable(PropTypes.number),
        bodyHair: PropTypes.nullable(PropTypes.string),
        boobsFake: PropTypes.nullable(PropTypes.number),
        breast: PropTypes.nullable(PropTypes.number),
        breastSizeType: PropTypes.nullable(PropTypes.number), // shemale
        city: PropTypes.nullable(PropTypes.string),
        colorEye: PropTypes.nullable(PropTypes.string),
        colorHair: PropTypes.nullable(PropTypes.string),
        country: PropTypes.nullable(PropTypes.string),
        cupSize: PropTypes.nullable(PropTypes.string),
        ethnicity: PropTypes.nullable(PropTypes.string),
        extra: PropTypes.nullable(PropTypes.string),
        height: PropTypes.nullable(PropTypes.number),
        hip: PropTypes.nullable(PropTypes.number),
        name: PropTypes.nullable(PropTypes.string),
        physiqueCustom: PropTypes.nullable(PropTypes.string),
        piercings: PropTypes.nullable(PropTypes.string),
        profession: PropTypes.nullable(PropTypes.string),
        sexualRole: PropTypes.nullable(PropTypes.number),
        shoeSize: PropTypes.nullable(PropTypes.number),
        tatoos: PropTypes.nullable(PropTypes.string),
        waist: PropTypes.nullable(PropTypes.number),
        weight: PropTypes.nullable(PropTypes.number),

        birthday: PropTypes.nullable(PropTypes.shape({
            dateBirthD: PropTypes.nullable(PropTypes.number),
            dateBirthM: PropTypes.nullable(PropTypes.number),
            dateBirthY: PropTypes.nullable(PropTypes.number),
        })),

        lifetime: PropTypes.nullable(PropTypes.shape({
            dateBirth: PropTypes.nullable(PropTypes.number),
            dateDeath: PropTypes.nullable(PropTypes.number),
        })),

        careerTime: PropTypes.nullable(PropTypes.shape({
            dateCareerBegin: PropTypes.nullable(PropTypes.number),
            dateCareerEnd: PropTypes.nullable(PropTypes.number),
        })),

        penis: PropTypes.nullable(PropTypes.shape({ // gay
            penisCircumcision: PropTypes.nullable(PropTypes.number),
            penisSize: PropTypes.nullable(PropTypes.number),
            penisSizeType: PropTypes.nullable(PropTypes.number),
        })),
    }),

    pornstarInfoModel = process.env.NODE_ENV === 'production' ? null : PropTypes.exact({
        id: PropTypes.number,
        // idTag: PropTypes.number,
        // thumbPath: PropTypes.string,
        thumbUrl: PropTypes.string,
        // urlGalleries: PropTypes.string,
    })

const
    // {foo: 'foo', bar: 'bar'}
    pornstarInfoModelPropsKeys = process.env.NODE_ENV === 'production' ? null :
        Object.freeze(mapValues(pornstarInfoModelProps, (x, k) => k)),

    // get incoming property by verified key (which must be presented in the model) or return 'null'
    getString = process.env.NODE_ENV === 'production' ? g :
        (src, propKey, ...xs) => g(src, g(pornstarInfoModelPropsKeys, propKey), ...xs) || null,

    getNumber = process.env.NODE_ENV === 'production' ? g :
        (src, propKey, ...xs) =>
            Number(g(src, g(pornstarInfoModelPropsKeys, propKey), ...xs)) || null

export const
    getPornstarInfoForTable = data => {
        if (process.env.NODE_ENV !== 'production') {
            assertPropTypes(
                incomingPornstarInfoModel,
                data,
                'getPornstarInfoForTable',
                'original source data for info of pornstar'
            )
        }

        const
            result = {
                alias: getString(data, 'alias'),
                astrologicalSign: getNumber(data, 'astrological_sign'),
                bodyHair: getString(data, 'body_hair'),
                boobsFake: getNumber(data, 'boobs_fake'),
                breast: getNumber(data, 'breast'),
                breastSizeType: getNumber(data, 'breast_size_type'), // shemale
                city: getString(data, 'city'),
                colorEye: getString(data, 'color_eye'),
                colorHair: getString(data, 'color_hair'),
                country: getString(data, 'country'),
                cupSize: getString(data, 'cup_size'),
                ethnicity: getString(data, 'ethnicity'),
                extra: getString(data, 'extra'),
                height: getNumber(data, 'height'),
                hip: getNumber(data, 'hip'),
                name: getString(data, 'name'),
                physiqueCustom: getString(data, 'physique_custom'),
                piercings: getString(data, 'piercings'),
                profession: getString(data, 'profession'),
                sexualRole: getNumber(data, 'sexual_role'),
                shoeSize: getNumber(data, 'shoe_size'),
                tatoos: getString(data, 'tatoos'),
                waist: getNumber(data, 'waist'),
                weight: getNumber(data, 'weight'),
            }

        if ( // set 'null' or get complex parameters for birthday
            getNumber(data, 'dt_birth_d') ||
            getNumber(data, 'dt_birth_m') ||
            getNumber(data, 'dt_birth_y')
        )
            result.birthday = {
                dateBirthD: getNumber(data, 'dt_birth_d'),
                dateBirthM: getNumber(data, 'dt_birth_m'),
                dateBirthY: getNumber(data, 'dt_birth_y'),
            }
        else
            result.birthday = null


        if ( // set 'null' or get complex parameters for lifetime
            getNumber(data, 'dt_birth') ||
            getNumber(data, 'dt_death')
        )
            result.lifetime = {
                dateBirth: getNumber(data, 'dt_birth'),
                dateDeath: getNumber(data, 'dt_death'),
            }
        else
            result.lifetime = null


        if ( // set 'null' or get complex parameters for careerTime
            getNumber(data, 'dt_career_begin') ||
            getNumber(data, 'dt_career_end')
        )
            result.careerTime = {
                dateCareerBegin: getNumber(data, 'dt_career_begin'),
                dateCareerEnd: getNumber(data, 'dt_career_end'),
            }
        else
            result.careerTime = null


        if ( // set 'null' or get complex parameters for penis
            getNumber(data, 'penis_circumcision') ||
            getNumber(data, 'penis_size') ||
            getNumber(data, 'penis_size_type')
        )
            result.penis = { // gay
                penisCircumcision: getNumber(data, 'penis_circumcision'),
                penisSize: getNumber(data, 'penis_size'),
                penisSizeType: getNumber(data, 'penis_size_type'),
            }
        else
            result.penis = null


        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                pornstarInfoForTableModel,
                result,
                'getPornstarInfoForTable',
                'result data for info of pornstar'
            )

        return result
    },

    getPornstarInfo = data => {
        if (process.env.NODE_ENV !== 'production') {
            assertPropTypes(
                incomingPornstarInfoModel,
                data,
                'getPornstarInfo',
                'original source data for info of pornstar'
            )
        }

        const
            result = {
                id: getNumber(data, 'id'),
                // idTag: getNumber(data, 'id_tag'),
                // thumbPath: getString(data, 'thumb_path'),
                thumbUrl: getString(data, 'thumb_url'),
                // urlGalleries: getString(data, 'url_galleries'),
            }


        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                pornstarInfoModel,
                result,
                'getPornstarInfo',
                'result data for info of pornstar'
            )

        return result
    }
