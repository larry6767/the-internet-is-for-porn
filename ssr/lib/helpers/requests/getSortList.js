import {
    map,
    pick,
} from 'lodash'
import {getLocalText} from './index'

export default (activeNavTabs, langId) => map(
    pick(
        activeNavTabs,
        ['sort_LATEST', 'sort_LONGEST', 'sort_POPULAR', 'fav_galleries', 'fav_models']
    ),
    ({ACTIVE}, key) => {
        key = key.slice(key.indexOf('_') + 1).toLowerCase()

        return item = {
            active: ACTIVE,
            value: key,
            localText: getLocalText(langId, key),
        }
    }
)
