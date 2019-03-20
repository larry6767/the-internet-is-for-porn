import {map} from 'lodash'

export default (data, quantity = null, withImage = false) => {
    const
        preparedData = map(data, ({id, name, sub_url, items_count, thumb_url}) => {
            const
                result = {
                    id: Number(id),
                    name,
                    subPage: sub_url,
                    itemsCount: Number(items_count),
                }

            if (withImage) {
                result.thumb = thumb_url
            }

            return result
        })

    return quantity ? preparedData.slice(0, quantity) : preparedData
}
