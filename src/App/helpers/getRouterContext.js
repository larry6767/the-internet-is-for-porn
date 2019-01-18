import {Record} from 'immutable'

import ig from './immutable/provedGet'
import {assertPropTypes} from './propTypes/check'
import {routerContextModel} from '../models'

const
    RouterContextRecord = Record({
        location: null,
        router: null,
    })

export default state => {
    const
        result = RouterContextRecord({
            location: ig(state, 'router', 'location'),
            router: ig(state, 'app', 'locale', 'router'),
        })

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(routerContextModel, result, 'getRouterContext', 'result')

    return result
}
