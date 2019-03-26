import {map, concat, sortBy, reduce} from 'lodash'

// local libs
import {nichesListWithLetterModel, nichesListModel} from 'src/App/models'
import {plainProvedGet as g, assertPropTypes} from 'src/App/helpers'
import {nichesLettersModel} from 'ssr/lib/helpers/mapFns/validation'

export default (letters, withLetter = false) => {
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(nichesLettersModel, letters, 'getNichesListByLetters', 'letters')
    }

    const
        preparedData = reduce(
            letters,
            (acc, letter, key) => {
                const letterItems = sortBy(
                    map(letter, x => {
                        const preparedItemData = {
                            id: Number(g(x, 'id')),
                            name: g(x, 'name'),
                            subPage: g(x, 'sub_url'),
                            itemsCount: Number(g(x, 'items_count')),
                        }

                        if (withLetter)
                            preparedItemData.letter = g(key, [])

                        return preparedItemData
                    }),
                    o => o.name
                )

                acc = concat(acc, letterItems)
                return acc
            }, []
        )

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            withLetter ? nichesListWithLetterModel : nichesListModel,
            preparedData,
            'getPornstarsList',
            'result data'
        )

    return preparedData
}
