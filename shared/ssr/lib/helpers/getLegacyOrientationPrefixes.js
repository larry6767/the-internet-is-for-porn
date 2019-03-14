// local libs
import {plainProvedGet as g} from 'src/App/helpers'
import apiLocales from 'ssr/locale-mapping/backend-api'

export default localeCode => g(apiLocales, localeCode, 'orientationPrefixes')
