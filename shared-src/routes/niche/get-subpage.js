// API accepts requests like '/somepage-latest-5.html',
// but on the client side this is implemented like '/section/somepage?sort=lates&page=5'
export default (child, sort = null, page = 1) => {
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
