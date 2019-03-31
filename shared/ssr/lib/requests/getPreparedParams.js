import {find, padStart} from 'lodash'
import queryString from 'query-string'

// local libs
import {plainProvedGet as g} from 'src/App/helpers'
import routerLocales from 'ssr/locale-mapping/router'

const
    orderingMapping = Object.freeze({
        byDate: 'latest',
        byDuration: 'longest',
        byPopularity: 'popular',
        byRelevant: 'relevant',
    })

export const
    getPreparedParams = (
        localeCode,
        orientationCode,
        page,

        child,
        subchild,
        ordering = null,
        pagination = 1,
        archive,
        searchQuery = null,
    ) => {
        const
            qs = {},
            backOrdering = !ordering ? null : find(
                Object.keys(orderingMapping),
                k => g(routerLocales, localeCode, 'ordering', k, 'qsValue') === ordering
            ),
            isSitePage = page === 'site',
            isSearch = page === 'findVideos'

        let
            preparedOrdering = backOrdering !== null ? g(orderingMapping, backOrdering) : null,
            preparedPagination = pagination && Number(pagination) - 1 > 0
                ? `-${Number(pagination) - 1}`
                : '',
            preparedArchive

        if ( // because popular(relevant for search) by default
            (
                !isSearch && preparedOrdering &&
                preparedOrdering !== g(orderingMapping, 'byPopularity')
            ) ||
            (
                isSearch && preparedOrdering &&
                preparedOrdering !== g(orderingMapping, 'byRelevant')
            )
        )
            preparedOrdering = isSitePage ? `/${preparedOrdering}` : `-${preparedOrdering}`
        else
            preparedOrdering = ''

        switch (g(archive, 'length')) {
            case 0:
                preparedArchive = ''
                break;
            case 2:
                const
                    year = padStart(g(archive, 0), 4, '0'),
                    month = padStart(g(archive, 1), 2, '0')

                preparedArchive = `/${year}-${month}-archive`
                break;
            default:
                throw new Error(`Invalid "archive" argument: ${JSON.stringify(archive)}`)
        }

        if (ordering && !backOrdering)
            throw new Error(`"ordering" argument is broken: ${JSON.stringify(ordering)}`)

        if (searchQuery)
            qs.q = searchQuery

        if (searchQuery && pagination)
            qs.p = pagination

        return {
            localeCode: localeCode ? localeCode : '',
            orientationCode: orientationCode ? orientationCode : '',
            page: page ? page : '',
            child: child ? child : '',
            subchild: subchild ? subchild : '',
            ordering: preparedOrdering,
            pagination: preparedPagination,
            archive: preparedArchive,
            qs: g(Object.keys(qs), 'length') > 0 ? `?${queryString.stringify(qs)}` : ''
        }
    }
