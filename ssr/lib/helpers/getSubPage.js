import {padStart} from 'lodash'
import queryString from 'query-string'

import g from '../../App/helpers/plain/provedGet'
import ig from '../../App/helpers/immutable/provedGet'

const
    orderingMapping = Object.freeze({
        byDate: 'latest',
        byDuration: 'longest',
        byPopularity: 'popular',
        byRelevant: 'relevant',
    }),

    getSubPageForSearch = (sort = null, page = 1, query = '') => {
        const
            ordering = sort !== null ? g(orderingMapping, sort) : null,
            qs = {},

            // !== relevant - because relevant by default, without postfix '-relevant'
            subPage =
                ordering !== null && ordering !== g(orderingMapping, 'byRelevant')
                ? `-${ordering}`
                : ''

        if (query) qs.q = query
        if (page > 0) qs.p = page

        return `${subPage}${
            g(Object.keys(qs), 'length') > 0 ? `?${queryString.stringify(qs)}` : ''
        }`
    },

    // API accepts requests like '/somepage-latest-5.html',
    // but on the client side this is implemented like '/section/somepage?sort=latest&page=5'.
    getSubPage = (child, sort = null, page = 1, archive = [], query = null) => {
        if (query !== null) return getSubPageForSearch(sort, page, query)

        child = child || '' // Empty `child` is for pages like /somepage?sort=latest&page=5

        switch (g(archive, 'length')) {
            case 0: break;
            case 2:
                const
                    year = padStart(g(archive, 0), 4, '0'),
                    month = padStart(g(archive, 1), 2, '0')

                child = `${child}/${year}-${month}-archive`
                break;
            default:
                throw new Error(`Invalid "archive" argument: ${JSON.stringify(archive)}`)
        }

        const
            ordering = sort !== null ? g(orderingMapping, sort) : null,

            // because '/section/somepage?page=1' corresponds to '/somepage.html',
            // '/section/somepage?page=2' matches '/somepage-1.html', etc
            pagination = Number(page) - 1,

            // !== popular - because popular by default, without postfix '-popular'
            subPage = ordering !== null && ordering !== g(orderingMapping, 'byPopularity')
                ? `${child}-${ordering}`
                : child

        return (
            pagination > 0
                ? `${subPage}-${pagination}`
                : subPage
        )
    }

export {orderingMapping}
export default getSubPage
