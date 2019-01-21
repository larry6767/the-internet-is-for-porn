import {Record, fromJS} from 'immutable'

import ig from './immutable/provedGet'
import {assertPropTypes} from './propTypes/check'
import {routerContextModel, ssrRouterContextModel} from '../models'

const
    RouterContextRecord = Record({
        location: null,
        router: null,
        currentOrientation: null,
        legacyOrientationPrefixes: null,
    })

export default (state, ssrRouterLocaleMapping = null, ssrLegacyOrientationPrefixes = null) => {
    const
        result = RouterContextRecord({
            location: ig(state, 'router', 'location'),

            router:
                ssrRouterLocaleMapping === null
                    ? ig(state, 'app', 'locale', 'router')
                    : fromJS(ssrRouterLocaleMapping),

            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),

            legacyOrientationPrefixes:
                ssrLegacyOrientationPrefixes === null
                    ? null
                    : fromJS(ssrLegacyOrientationPrefixes),
        })

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            ssrRouterLocaleMapping === null ? routerContextModel : ssrRouterContextModel,
            result,
            'getRouterContext',
            'result'
        )

    return result
}
