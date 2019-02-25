import {fromJS} from 'immutable'
import ig from './immutable/provedGet'
// we get pageText for all pages from backend, but for 'notFound'... you know, we have crazy backend
export default state => fromJS({
    title: ig(state, 'app', 'locale', 'i18n', 'notFound', 'title'),
    description: ig(state, 'app', 'locale', 'i18n', 'notFound', 'description'),
    keywords: null,
    headerTitle: ig(state, 'app', 'locale', 'i18n', 'notFound', 'headerTitle'),
    headerDescription: ig(state, 'app', 'locale', 'i18n', 'notFound', 'headerDescription'),
    listHeader: ig(state, 'app', 'locale', 'i18n', 'notFound', 'listHeader'),
})
