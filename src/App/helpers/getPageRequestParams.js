import {get} from 'lodash'
import queryString from 'query-string'

import g from './plain/provedGet'
import ig from './immutable/provedGet'
import {assertPropTypes} from './propTypes/check'

import {
    PageRequestParamsRecord,
    PageRequestArchiveParamRecord,
    pageRequestParamsModel,
} from '../models'

export default (routerContext, match) => {
    const
        qs = queryString.parse(ig(routerContext, 'location', 'search')),
        ordering = get(qs, [ig(routerContext, 'router', 'ordering', 'qsKey')], null),
        pagination = get(qs, [ig(routerContext, 'router', 'pagination', 'qsKey')], null),
        searchQuery = get(qs, [ig(routerContext, 'router', 'searchQuery', 'qsKey')], null),

        archive =
            !(match.params[0] && match.params[1]) ? null :
            PageRequestArchiveParamRecord({
                year: Number(g(match, 'params', 0)),
                month: Number(g(match, 'params', 1)),
            }),

        result = PageRequestParamsRecord({
            orientationCode: ig(routerContext, 'currentOrientation'),
            child: match.params.child || null,
            subchild: match.params.subchild || null,
            ordering,
            pagination: pagination === null ? null : Number(pagination),
            archive,
            searchQuery,
        })

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            pageRequestParamsModel,
            result,
            'getPageRequestParams',
            'result'
        )

    return result
}
