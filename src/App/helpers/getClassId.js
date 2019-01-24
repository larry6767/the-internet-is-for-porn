import {find} from 'lodash'
import {
    PropTypes,
    assertPropTypes,
} from '.'
import {orientationCodes} from '../models'

const
    classIdModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.oneOf([1, 2, 3])

export default (currentOrientation) => {
    const classId = orientationCodes.indexOf(
        find(orientationCodes, x => x === currentOrientation)
    ) + 1

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            classIdModel,
            classId,
            'getClassId',
            'classId'
        )

    return classId
}
