import {reduce, set} from 'lodash'

import {plainProvedGet as g} from '../../App/helpers'
import apiLocales from '../../locale-mapping/backend-api'

export default localeCode => reduce(
    g(apiLocales, localeCode, 'pageCode'),
    (obj, x, k) => set(obj, k, g(x, 'code')),
    {}
)
