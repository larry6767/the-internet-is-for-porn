import getCookie from '../cookie/getCookie'
import setCookie from '../cookie/setCookie'

import ig from '../immutable/provedGet'

export default (cookieName, item) => {
    const
        currentCookie = getCookie(cookieName),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${ig(item, 'id')}F`

    setCookie(cookieName, nextCookie, 3600 * 24 * 365 * 20)
}
