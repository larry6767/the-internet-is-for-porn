import {
    map,
    concat,
    sortBy,
    reduce,
} from 'lodash'

export default (letters) => reduce(
    letters,
    (acc, letter) => {
        const letterItems = sortBy(
            map(letter, ({id, name, sub_url, items_count}) => ({
                id,
                name,
                subPage: sub_url,
                itemsCount: items_count,
            })),
            o => o.name
        )

        acc = concat(acc, letterItems)
        return acc
    }, []
)
