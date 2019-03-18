import {select} from 'redux-saga/effects'

// local libs
import ig from 'src/App/helpers/immutable/provedGet'
import getPageData from 'src/App/helpers/getPageData'
import buildRequestBody from 'src/App/helpers/buildRequestBody'

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
