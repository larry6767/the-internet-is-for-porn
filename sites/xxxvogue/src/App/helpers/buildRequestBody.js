import {select} from 'redux-saga/effects'

// local libs
import getProvedPageKey from 'src/App/helpers/getProvedPageKey'
import ig from 'src/App/helpers/immutable/provedGet'

export default (pageKey, pageRequestParams) =>
    select(x => Object.assign(pageRequestParams.toJS(), {
        localeCode: ig(x, 'app', 'locale', 'localeCode'),
        page: getProvedPageKey(pageKey),
    }))
