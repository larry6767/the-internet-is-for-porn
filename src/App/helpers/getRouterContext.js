import {Record} from 'immutable'

import ig from './immutable/provedGet'
import {assertPropTypes} from './propTypes/check'
import {routerContextModel} from '../models'

const
    RouterContextRecord = Record({
        location: null,
        router: null,
        currentOrientation: null,
    })

export default state => {
    const
        result = RouterContextRecord({
            location: ig(state, 'router', 'location'),
            router: ig(state, 'app', 'locale', 'router'),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
        })

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(routerContextModel, result, 'getRouterContext', 'result')

    return result
}
