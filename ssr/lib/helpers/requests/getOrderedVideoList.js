import _, {
    sortBy
} from 'lodash'

export default (ids, items) => {
    const
        // Just on `Niche` page it's `Array` but on archive page it's `Object`.
        idsOrdering =
            Array.isArray(ids)
            ? ids
            : _(ids).toPairs().sortBy(0).map(([k, v]) => Number(v)).value()

    return sortBy(
        items,
        ({id}) => idsOrdering.indexOf(Number(id))
    )
}
