import {find} from 'lodash'

import g from './plain/provedGet'
import ig from './immutable/provedGet'

const
    orderingMapping = Object.freeze({
        byDate: 'latest',
        byDuration: 'longest',
        byPopularity: 'popular',
        byRelevant: 'relevant',
    }),

    // API accepts requests like '/somepage-latest-5.html',
    // but on the client side this is implemented like '/section/somepage?sort=latest&page=5'.
    getSubPage = (child, sort = null, page = 1, archive = []) => {
        child = child || '' // Empty `child` is for pages like /somepage?sort=latest&page=5

        switch (archive.length) {
            case 0: break;
            case 2:
                child = `${child}/${archive[0]}-${archive[1]}-archive`
                break;
            default:
                throw new Error(`Invalid "archive" value: ${JSON.stringify(archive)}`)
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
    },

    getSubPageForSearch = (sort = null, page = 1, query = '') => {
        const
            ordering = sort !== null ? g(orderingMapping, sort) : null

        let // !== relevant - because relevant by default, without postfix '-relevant'
            subPage = ordering !== null && ordering !== g(orderingMapping, 'byRelevant')
                ? `-${ordering}`
                : ''

        subPage = query
            ? `${subPage}?q=${query}`
            : subPage

        return (
            page > 0
                ? `${subPage}&p=${page}`
                : subPage
        )
    }

export default getSubPage

export const
    localizedGetSubPage = routerContext => (child, sort = null, page, archive, query) => {
        const
            ordering =
                sort === null ? null : find(
                    Object.keys(orderingMapping),
                    k => ig(routerContext, 'router', 'ordering', k, 'qsValue') === sort
                )

        if (sort !== null && !ordering)
            throw new Error(`"sort" argument is broken: ${JSON.stringify(sort)}`)

        return query
            ? getSubPageForSearch(ordering, page, query)
            : getSubPage(child, ordering, page, archive)
    }
