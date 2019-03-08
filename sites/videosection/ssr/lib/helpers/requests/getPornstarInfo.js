import {mapValues, pick} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../../../App/helpers'
import {pornstarInfoForTableModel} from '../../../App/Pornstar/models'

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
    getString = process.env.NODE_ENV === 'production'
        ? (src, propKey, ...xs) => g(src, propKey, ...xs) || null
        : (src, propKey, ...xs) => g(src, g(pornstarInfoModelPropsKeys, propKey), ...xs) || null,

    getNumber = process.env.NODE_ENV === 'production'
        ? (src, propKey, ...xs) => Number(g(src, propKey, ...xs)) || null
        : (src, propKey, ...xs) =>
            Number(g(src, g(pornstarInfoModelPropsKeys, propKey), ...xs)) || null,

    getAstrologicalSign = v => v === null ? null
        : v === 1 ? 'Aries ♈'
        : v === 2 ? 'Taurus ♉'
        : v === 3 ? 'Gemini ♊'
        : v === 4 ? 'Cancer ♋'
        : v === 5 ? 'Leo ♌'
        : v === 6 ? 'Virgo ♍'
        : v === 7 ? 'Libra ♎'
        : v === 8 ? 'Scorpio ♏'
        : v === 9 ? 'Sagittarius ♐'
        : v === 10 ? 'Capricorn ♑'
        : v === 11 ? 'Aquarius ♒'
        : v === 12 ? 'Pisces ♓'
        : 'Unknown ?',

    getBoobsFake = v => v === null ? null
        : v === 1 ? 'Fake'
        : v === 2 ? 'Natural'
        : 'Unknown',

    getBreastSizeType = v => v === null ? null
        : v === 2 ? 'Small'
        : v === 5 ? 'Medium'
        : v === 7 ? 'Big'
        : 'Unknown',

    getSexualRole = v => v === null ? null
        : v === 1 ? 'Active'
        : v === 2 ? 'Switch Hitter'
        : v === 3 ? 'Bottom'
        : 'Unknown',

    getPenisSizeType = v => v === null ? null // TODO need to match the keys and values
        : v === 2 ? 'Small '
        : v === 5 ? 'Medium '
        : v === 7 ? 'Big '
        : 'Unknown ',

    getPenisCircumcision = v => v === null ? null
        : v === 1 ? 'Circumcised'
        : v === 2 ? 'Not Circumcised'
        : 'Unknown',

    getPenis = (data, sizeTypeKey, sizeKey, circumcisionKey) => {
        const
            sizeTypeValue = getPenisSizeType(getNumber(data, sizeTypeKey)),
            sizeValue = getNumber(data, sizeKey),
            circumcisionValue = getPenisCircumcision(getNumber(data, circumcisionKey))

        if (sizeTypeValue || sizeValue || circumcisionValue)
            return `${sizeTypeValue ? `${sizeTypeValue }` : ''}${
                sizeValue ? `${sizeValue} cm ` : ''}${
                    circumcisionValue ? `${circumcisionValue}` : ''}`
        else
            return null
    },

    getBirthday = (data, monthsNames, dayKey, monthKey, yearKey) => {
        const
            dayValue = getNumber(data, dayKey),
            monthValue = getNumber(data, monthKey),
            yearValue = getNumber(data, yearKey)

        if (dayValue || monthValue || yearValue)
            return `${dayValue} ${monthValue ? g(monthsNames, monthValue) : ''} ${yearValue}`
        else
            return null
    },

    getTimePeriod = (data, startKey, endKey) => {
        const
            startValue = getNumber(data, startKey),
            endValue = getNumber(data, endKey)

        if (startValue || endValue)
            return `${startValue ? startValue : 'Unknown'} - ${endValue ? endValue : 'Unknown'}`
        else
            return null
    },

    keysOrder = Object.freeze([
        'name',
        'alias',
        'birthday',
        'astrologicalSign',
        'lifetime',
        'profession',
        'country',
        'city',
        'ethnicity',
        'colorEye',
        'colorHair',
        'height',
        'weight',
        'breast',
        'breastSizeType',
        'cupSize',
        'boobsFake',
        'shoeSize',
        'tatoos',
        'piercings',
        'waist',
        'hip',
        'penis',
        'bodyHair',
        'physiqueCustom',
        'sexualRole',
        'careerTime',
        'extra',
    ]),

    validKeysModel = PropTypes.arrayOf(PropTypes.oneOf(keysOrder))

export const
    getPornstarInfoForTable = (data, monthsNames) => {
        if (process.env.NODE_ENV !== 'production') {
            assertPropTypes(
                incomingPornstarInfoModel,
                data,
                'getPornstarInfoForTable',
                'original source data for info of pornstar'
            )
        }

        let
            result = {
                name: getString(data, 'name'),
                alias: getString(data, 'alias'),
                birthday: getBirthday(data, monthsNames, 'dt_birth_d', 'dt_birth_m', 'dt_birth_y'),
                astrologicalSign: getAstrologicalSign(getNumber(data, 'astrological_sign')),
                lifetime: getTimePeriod(data, 'dt_birth', 'dt_death'),
                profession: getString(data, 'profession'),
                country: getString(data, 'country'),
                city: getString(data, 'city'),
                ethnicity: getString(data, 'ethnicity'),
                colorEye: getString(data, 'color_eye'),
                colorHair: getString(data, 'color_hair'),
                height: getNumber(data, 'height'),
                weight: getNumber(data, 'weight'),
                breast: getNumber(data, 'breast'),
                breastSizeType: getBreastSizeType(getNumber(data, 'breast_size_type')),
                cupSize: getString(data, 'cup_size'),
                boobsFake: getBoobsFake(getNumber(data, 'boobs_fake')),
                shoeSize: getNumber(data, 'shoe_size'),
                tatoos: getString(data, 'tatoos'),
                piercings: getString(data, 'piercings'),
                waist: getNumber(data, 'waist'),
                hip: getNumber(data, 'hip'),
                penis: getPenis(data, 'penis_size_type', 'penis_size', 'penis_circumcision'),
                bodyHair: getString(data, 'body_hair'),
                physiqueCustom: getString(data, 'physique_custom'),
                sexualRole: getSexualRole(getNumber(data, 'sexual_role')),
                careerTime: getTimePeriod(data, 'dt_career_begin', 'dt_career_end'),
                extra: getString(data, 'extra'),
            }

        // checking for case we added a new key to a model for result (`pornstarInfoForTableModel`)
        // but forgot to add it to `keysOrder`.
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                validKeysModel,
                Object.keys(result),
                'getPornstarInfoForTable',
                'only allowed keys in result'
            )

        const
            filteredKeysOrder = keysOrder.filter(k => g(result, k) !== null)

        result = pick(result, filteredKeysOrder)

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                pornstarInfoForTableModel,
                result,
                'getPornstarInfoForTable',
                'result data for info of pornstar'
            )

        return {
            data: result,
            keysOrder: filteredKeysOrder,
        }
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
