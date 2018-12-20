export default (state, key, item) => {
    const
        currentList = state.get(key)

    if (!currentList.size)
        return state.set('isLoaded', false)

    return state.set(key, currentList.push(item))
}
