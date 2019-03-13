import {map} from 'lodash'

export default (data) =>
    map(data, ({id, name, sub_url, items_count, thumb_url}) => ({
        id: Number(id),
        name,
        subPage: sub_url,
        itemsCount: Number(items_count),
        thumb: thumb_url,
    }))
