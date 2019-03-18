import {map, compact} from 'lodash'

// local libs
import getCookie from 'src/App/helpers/cookie/getCookie'

export default cookieName => getCookie(cookieName)
    ? map(
        compact(getCookie(cookieName).split('F')),
        x => Number(x)
    )
    : []
