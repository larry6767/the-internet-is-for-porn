import getCookie from 'src/App/helpers/cookie/getCookie'
import setCookie from 'src/App/helpers/cookie/setCookie'

import ig from 'src/App/helpers/immutable/provedGet'

export default (cookieName, item) => {
    const
        currentCookie = getCookie(cookieName),
        nextCookie = `${currentCookie ? currentCookie : 'F'}${ig(item, 'id')}F`

    setCookie(cookieName, nextCookie, 3600 * 24 * 365 * 20)
}
