import {map, concat, sortBy, reduce} from 'lodash'

// local libs
import {assertPropTypes, plainProvedGet as g} from 'src/App/helpers'
import {pornstarsListModel, pornstarsListWithLetterModel} from 'src/App/models'
import {pornstarsLettersModel, pornstarsItemsModel} from 'ssr/lib/helpers/mapFns/validation'

export default (letters, items, quantity = null, withLetter = false) => {
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(pornstarsLettersModel, letters, 'getPornstarsList', 'letters')
        assertPropTypes(pornstarsItemsModel, items, 'getPornstarsList', 'original source')
    }

    let
        preparedData = reduce(
            letters,
            (acc, letter, key) => concat(acc, sortBy(
                map(letter, x => {
                    const preparedItemData = {
                        id: Number(g(x, 'id')),
                        name: g(x, 'name'),
                        subPage: g(x, 'sub_url'),
                        itemsCount: Number(g(x, 'items_count')),
                        thumb: g(items, g(x, 'id'), 'thumb_url'),
                    }

                    if (withLetter)
                        preparedItemData.letter = g(key, [])

                    return preparedItemData
                }),
                o => g(o, 'name')
            )),
            []
        )

    if (quantity)
        preparedData = preparedData.slice(0, quantity)

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            withLetter ? pornstarsListWithLetterModel : pornstarsListModel,
            preparedData,
            'getPornstarsList',
            'result data'
        )

    return preparedData
}
