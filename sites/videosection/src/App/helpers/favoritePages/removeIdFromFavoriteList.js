export default (state, key, id) => {
    const
        currentState = state.get(key),
        targetPosition = currentState.indexOf(id)

    return targetPosition !== -1
        ? state.set(key, currentState.delete(targetPosition))
        : state.set(key, currentState)
}
