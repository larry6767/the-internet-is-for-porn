import {set} from 'lodash'

// local libs
import g from 'src/App/helpers/plain/provedGet'

// WARNING! Be careful! Avoid recursive dependencies!
import {pageKeys} from 'src/App/pageKeysModel'

const
    // {home: 'home', niche: 'niche', ...etc
    pageKeyMapping = Object.freeze(pageKeys.reduce((o, k) => set(o, k, k), {}))

// robust way to get a page key
export default k => g(pageKeyMapping, k)
