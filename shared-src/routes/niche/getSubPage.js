// API accepts requests like '/somepage-latest-5.html',
// but on the client side this is implemented like '/section/somepage?sort=lates&page=5'
export default (child, sort = null, page = 1, archive = []) => {
    child = child || '' // for pages like /somepage?sort=lates&page=5
    switch (archive.length) {
        case 0: break;
        case 2:
            child = `${child}/${archive[0]}-${archive[1]}-archive`
            break;
        default:
            throw new Error(`Invalid "archive" value: ${JSON.stringify(archive)}`)
    }

    const
        // because '/section/somepage?page=1' corresponds to '/somepage.html',
        // '/section/somepage?page=2' matches '/somepage-1.html', etc
        pagination = Number(page) - 1

    let // !== popular - because popular by default, without postfix '-popular'
        subPage = sort && sort !== 'popular'
            ? `${child}-${sort}`
            : child

    subPage = pagination > 0
        ? `${subPage}-${pagination}`
        : subPage

    return subPage
}
