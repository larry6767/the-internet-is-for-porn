import {find} from 'lodash'

// local libs
import {PropTypes} from 'src/App/helpers/propTypes'
import {assertPropTypes} from 'src/App/helpers/propTypes/check'

// WARNING! Be careful! Avoid recursive dependencies!
import {orientationCodes} from 'src/App/models'

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
