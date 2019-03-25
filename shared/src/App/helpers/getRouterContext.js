import {Record, fromJS} from 'immutable'

// local libs
import ig from 'src/App/helpers/immutable/provedGet'
import {assertPropTypes} from 'src/App/helpers/propTypes/check'

// WARNING! Be careful! Avoid recursive dependencies!
import {routerContextModel, ssrRouterContextModel} from 'src/App/models'

const
    RouterContextRecord = Record({
        location: null,
        router: null,
        currentOrientation: null,
        ssr: null,
    }),

    SsrContextRecord = Record({
        legacyOrientationPrefixes: null,
        localeCode: null,
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

            ssr: ssrLegacyOrientationPrefixes === null
                ? null
                : SsrContextRecord({
                    legacyOrientationPrefixes: fromJS(ssrLegacyOrientationPrefixes),
                    localeCode: ig(state, 'app', 'locale', 'localeCode'),
                })
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
