import {reduce, set} from 'lodash'

import {plainProvedGet as g} from '../../App/helpers'
import apiLocales from '../../api-locale-mapping'

export default localeCode => reduce(
    g(apiLocales, localeCode, 'pageCode'),
    (obj, x, k) => set(obj, k, g(x, 'code')),
    {}
)
