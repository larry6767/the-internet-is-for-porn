import setCookie from 'src/App/helpers/cookie/setCookie'

export default name => setCookie(name, '', {
    expires: -1
})
