import {set} from 'lodash'
import {createAction} from 'redux-actions'

export default (prefix, actionTypes) =>
    actionTypes.reduce(
        (result, actionType) => set(
            result,
            actionType
                .toLowerCase()
                .replace(/_([a-z])/g, (x, y) => y.toUpperCase()),
            createAction(`${prefix}@${actionType}`)
        ),
        {}
    )
