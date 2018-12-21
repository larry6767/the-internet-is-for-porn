import {replace} from 'lodash'
import {getCookie, setCookie, deleteCookie} from '../'

export default (cookieName, id) => {
    const
        currentCookie = getCookie(cookieName),
        nextCookie = replace(currentCookie, `${id}F`, '')

    if (nextCookie === 'F')
        deleteCookie(cookieName)
    else
        setCookie(cookieName, nextCookie, 3600 * 24 * 365 * 20)
}
