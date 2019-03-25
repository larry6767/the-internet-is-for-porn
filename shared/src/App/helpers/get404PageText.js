// we get pageText for all pages from backend, but for 'notFound'... you know, we have crazy backend
import {fromJS} from 'immutable'

// local libs
import ig from 'src/App/helpers/immutable/provedGet'
import getDomain from 'src/App/helpers/getDomain'

const
    setDomain = (domain, x) => x.replace('%SITE%', domain)

export default state => {
    const
        domain = getDomain(state).replace('.com', '')

    return fromJS({
        title: setDomain(
            domain,
            ig(state, 'app', 'locale', 'i18n', 'notFound', 'title')
        ),
        description: setDomain(
            domain,
            ig(state, 'app', 'locale', 'i18n', 'notFound', 'description')
        ),
        keywords: '404',
        headerTitle: ig(state, 'app', 'locale', 'i18n', 'notFound', 'headerTitle'),
        headerDescription: setDomain(
            domain,
            ig(state, 'app', 'locale', 'i18n', 'notFound', 'headerDescription')
        ),
        listHeader: ig(state, 'app', 'locale', 'i18n', 'notFound', 'listHeader'),
    })
}
