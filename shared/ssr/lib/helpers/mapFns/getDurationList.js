import {set, map, pick} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'

const
    ordering = Object.freeze({
        all: 'all',
        '0-5': 'short',
        '5-15': 'medium',
        '15-0': 'long',
    }),

    incomingDurationModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.shape({selected: PropTypes.bool.isOptional}).isOptional,

    orderingIncomingModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape(
        Object.keys(ordering).reduce((ob, key) => set(ob, key, incomingDurationModel), {})
    ),

    durationModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.arrayOf(PropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        }))

export default durationList => {
    if ( ! durationList) return null
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            orderingIncomingModel,
            durationList,
            'getOrderingSortList',
            'incoming data'
        )

    const
        result = map(
            pick(durationList, Object.keys(ordering)),
            ({selected}, key) => ({
                isActive: selected ? selected : false,
                code: g(ordering, key),
            })
        )

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(durationModel, result, 'getDurationList', 'result')

    return result
}
