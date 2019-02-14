import {get} from 'lodash'
import queryString from 'query-string'
import {fromJS} from 'immutable'

import g from './plain/provedGet'
import ig from './immutable/provedGet'
import {assertPropTypes} from './propTypes/check'

// WARNING! Be careful! Avoid recursive dependencies!
import {pageRequestParamsModel} from '../models'

export default (routerContext, match, isSitePage = false) => {
    const
        qs = queryString.parse(ig(routerContext, 'location', 'search')),
        ordering = get(qs, [ig(routerContext, 'router', 'ordering', 'qsKey')], null),
        pagination = get(qs, [ig(routerContext, 'router', 'pagination', 'qsKey')], null),
        searchQuery = get(qs, [ig(routerContext, 'router', 'searchQuery', 'qsKey')], null),

        result = fromJS({
            orientationCode: ig(routerContext, 'currentOrientation'),
            child: match.params.child || null,
            subchild: match.params.subchild || null,
            ordering,
            pagination: pagination === null ? null : Number(pagination),

            archive: !(match.params[0] && match.params[1]) ? null : {
                year: Number(g(match, 'params', 0)),
                month: Number(g(match, 'params', 1)),
            },

            searchQuery,
            isSitePage,
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
