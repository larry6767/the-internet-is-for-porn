export default store => next => action => {
    console.debug('state before', store.getState())
    console.debug('dispatching', action)
    next(action)
    console.debug('state after', store.getState())
}
