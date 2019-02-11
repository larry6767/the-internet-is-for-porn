import {replace} from 'lodash'

import getCookie from '../cookie/getCookie'
import setCookie from '../cookie/setCookie'
import deleteCookie from '../cookie/deleteCookie'

export default (cookieName, id) => {
    const
        currentCookie = getCookie(cookieName),
        nextCookie = replace(currentCookie, `${id}F`, '')

    if (nextCookie === 'F')
        deleteCookie(cookieName)
    else
        setCookie(cookieName, nextCookie, 3600 * 24 * 365 * 20)
}
