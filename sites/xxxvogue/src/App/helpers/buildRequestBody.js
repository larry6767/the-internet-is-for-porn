import {select} from 'redux-saga/effects'

import getProvedPageKey from './getProvedPageKey'
import ig from './immutable/provedGet'

export default (pageKey, pageRequestParams) =>
    select(x => Object.assign(pageRequestParams.toJS(), {
        localeCode: ig(x, 'app', 'locale', 'localeCode'),
        page: getProvedPageKey(pageKey),
    }))
