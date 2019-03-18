import {Map} from 'immutable'

// local libs
import ig from 'src/App/helpers/immutable/provedGet'

export default state => ig(
    ig(state, 'app', 'mainHeader', 'language', 'siteLocales', 'list')
        .find(
            x => ig(x, 'code') === ig(state, 'app', 'locale', 'localeCode'),
            null,
            Map({host: '…'})
        ),
    'host'
)
