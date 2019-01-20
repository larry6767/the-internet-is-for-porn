import {set} from 'lodash'

import g from './plain/provedGet'
import {pageKeys} from '../models'

const
    // {home: 'home', niche: 'niche', ...etc
    pageKeyMapping = Object.freeze(pageKeys.reduce((o, k) => set(o, k, k), {}))

// robust way to get a page key
export default k => g(pageKeyMapping, k)
