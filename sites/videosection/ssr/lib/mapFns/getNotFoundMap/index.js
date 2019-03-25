import {plainProvedGet as g} from 'src/App/helpers'
import {getFilteredVideoList} from 'ssr/lib/helpers/mapFns'

export default x => ({
    videoList: getFilteredVideoList(
        g(x, 'page', 'GALS_INFO', 'ids'),
        g(x, 'page', 'GALS_INFO', 'items')
    ),
})
