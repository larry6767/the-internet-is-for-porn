import {find} from 'lodash'
import {orientationCodes} from '../models'

export default (currentOrientation) => orientationCodes.indexOf(
    find(orientationCodes, x => x === currentOrientation)
) + 1

