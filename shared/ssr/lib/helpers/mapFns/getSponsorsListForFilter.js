import {map, sortBy} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'

const
    incomingListModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.shape({
            selected: PropTypes.bool.isOptional,
            name: PropTypes.string.isOptional,
        }).isOptional,

    resultModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.arrayOf(PropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        }))

export default list => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            incomingListModel,
            list,
            'getOrderingSortList',
            'incoming data'
        )

    const
        result = sortBy(
            map(
                list,
                ({selected, name}, key) => ({
                    isActive: selected ? selected : false,
                    code: name ? name : 'all',
                })
            ),
            x => g(x, 'code') === 'all' ? 0 : 1
        )

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(resultModel, result, 'getSponsorsListForFilter', 'result')

    return result
}
