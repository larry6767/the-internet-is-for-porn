import {
    map,
} from 'lodash'

export default (data) =>
    map(data, ({id, name, sub_url, items_count, thumb_url}) => ({
        id,
        name,
        subPage: sub_url,
        itemsCount: items_count,
        thumb: thumb_url,
    }))
