import {map, compact} from 'lodash'

import getCookie from '../cookie/getCookie'

export default cookieName => getCookie(cookieName)
    ? map(
        compact(getCookie(cookieName).split('F')),
        x => Number(x)
    )
    : []
