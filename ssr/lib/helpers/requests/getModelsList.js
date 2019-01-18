import {
    map,
    concat,
    sortBy,
    reduce,
} from 'lodash'

export default (letters, items, withLetter = false) => reduce(
    letters,
    (acc, letter, key) => {
        const letterItems = sortBy(
            map(letter, ({id, name, sub_url, items_count}) => {
                const model = {
                    id: Number(id),
                    name,
                    subPage: sub_url,
                    itemsCount: Number(items_count),
                    thumb: items[id].thumb_url,
                }
                if (withLetter)
                    model.letter = key

                return model
            }),
            o => o.name
        )

        acc = concat(acc, letterItems)
        return acc
    }, []
)
