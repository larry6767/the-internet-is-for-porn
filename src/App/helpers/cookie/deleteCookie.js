import {setCookie} from '../'

export default name => setCookie(name, '', {
    expires: -1
})
