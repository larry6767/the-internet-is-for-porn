import {replace} from 'lodash'

// local libs
import getCookie from 'src/App/helpers/cookie/getCookie'
import setCookie from 'src/App/helpers/cookie/setCookie'
import deleteCookie from 'src/App/helpers/cookie/deleteCookie'

export default (cookieName, id) => {
    const
        currentCookie = getCookie(cookieName),
        nextCookie = replace(currentCookie, `${id}F`, '')

    if (nextCookie === 'F')
        deleteCookie(cookieName)
    else
        setCookie(cookieName, nextCookie, 3600 * 24 * 365 * 20)
}
