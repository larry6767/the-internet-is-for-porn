import {select} from 'redux-saga/effects'

import ig from './immutable/provedGet'
import getPageData from './getPageData'
import buildRequestBody from './buildRequestBody'

// saga effect
export default function* (ssrContext, pageKey, pageRequestParams) {
    const
        reqData = yield buildRequestBody(pageKey, pageRequestParams),

        data
            = (yield select(x => ig(x, 'app', 'ssr', 'isSSR')))
            ? (yield ssrContext.getPageData(reqData))
            : (yield getPageData(reqData))

    return data
}
