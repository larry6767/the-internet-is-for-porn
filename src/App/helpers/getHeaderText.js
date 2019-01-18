import {immutableProvedGet as ig, plainProvedGet as g} from './'

export default (data, isImmutable = false) => {
    if (isImmutable)
        return {
            title: ig(data, 'pageText', 'headerTitle'),
            description: ig(data, 'pageText', 'headerDescription'),
        }
    else
        return {
            title: g(data, 'pageText', 'headerTitle'),
            description: g(data, 'pageText', 'headerDescription'),
        }
}
