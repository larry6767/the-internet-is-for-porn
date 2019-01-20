import {plainProvedGet as g} from '../../App/helpers'
import apiLocales from '../../locale-mapping/backend-api'

export default localeCode => g(apiLocales, localeCode, 'orientationPrefixes')
