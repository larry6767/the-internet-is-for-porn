import {getCookie, setCookie} from '../'

export default (cookieName, item) => {
    const
        currentCookie = getCookie(cookieName),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${item.get('id')}F`

    setCookie(cookieName, nextCookie, 3600 * 24 * 365 * 20)
}
