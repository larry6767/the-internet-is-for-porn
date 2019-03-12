import {isImmutable} from 'immutable'

export default store => next => action => {
    // console.debug('state before: ', store.getState().toJS())
    console.debug('dispatching: ', {
        action: action.type,
        payload: isImmutable(action.payload) ? action.payload.toJS() : action.payload
    })
    next(action)
    // console.debug('state after: ', store.getState().toJS())
}
