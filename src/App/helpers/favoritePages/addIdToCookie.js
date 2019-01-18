import {getCookie, setCookie} from '../'

import ig from '../immutable/provedGet'

export default (cookieName, item) => {
    const
        currentCookie = getCookie(cookieName),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${ig(item, 'id')}F`

    setCookie(cookieName, nextCookie, 3600 * 24 * 365 * 20)
}
