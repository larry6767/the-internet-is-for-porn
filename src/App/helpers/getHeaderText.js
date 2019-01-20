import {immutableProvedGet as ig, plainProvedGet as g} from './'

export default (data, isImmutable = false, withTitle = true) => {
    if (isImmutable)
        return {
            title: withTitle ? ig(data, 'pageText', 'headerTitle') : null,
            description: ig(data, 'pageText', 'headerDescription'),
        }
    else
        return {
            title: withTitle ? g(data, 'pageText', 'headerTitle') : null,
            description: g(data, 'pageText', 'headerDescription'),
        }
}
