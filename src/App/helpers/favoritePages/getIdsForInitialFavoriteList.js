import {
    map,
    compact,
} from 'lodash'
import {getCookie} from '..'

export default (cookieName) => getCookie(cookieName)
    ? map(
        compact(getCookie(cookieName).split('F')),
        x => Number(x)
    )
    : []
