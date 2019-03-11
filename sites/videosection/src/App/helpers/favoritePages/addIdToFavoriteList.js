export default (state, key, id) => {
    const
        currentState = state.get(key),
        nextState = currentState.push(id)

    return state.set(key, nextState)
}
