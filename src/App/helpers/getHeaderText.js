import ig from './immutable/provedGet'
import g from './plain/provedGet'

export default (data, isImmutable = false, withTitle = true) =>
    isImmutable ? {
        title: withTitle ? ig(data, 'pageText', 'headerTitle') : null,
        description: ig(data, 'pageText', 'headerDescription'),
    } : {
        title: withTitle ? g(data, 'pageText', 'headerTitle') : null,
        description: g(data, 'pageText', 'headerDescription'),
    }
