export default (state, key, id) => {
    const
        currentList = state.get(key)

    if (!currentList.size)
    return state

    const
        targetPosition = currentList.findIndex(x => x.get('id') === id)

    return targetPosition !== -1
        ? state.set(key, currentList.delete(targetPosition))
        : state.set(key, currentList)
}
