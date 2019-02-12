import setCookie from './setCookie'

export default name => setCookie(name, '', {
    expires: -1
})
