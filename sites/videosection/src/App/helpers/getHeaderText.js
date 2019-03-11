import ig from './immutable/provedGet'
import g from './plain/provedGet'

export default (pageText, isImmutable = false, withTitle = true) =>
    isImmutable ? {
        title: withTitle ? ig(pageText, 'headerTitle') : null,
        description: ig(pageText, 'headerDescription'),
    } : {
        title: withTitle ? g(pageText, 'headerTitle') : null,
        description: g(pageText, 'headerDescription'),
    }
