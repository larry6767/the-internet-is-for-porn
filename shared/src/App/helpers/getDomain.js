import {Map} from 'immutable'
import ig from './immutable/provedGet'

export default state => ig(
    ig(state, 'app', 'mainHeader', 'language', 'siteLocales', 'list')
        .find(
            x => ig(x, 'code') === ig(state, 'app', 'locale', 'localeCode'),
            null,
            Map({host: '…'})
        ),
    'host'
)
