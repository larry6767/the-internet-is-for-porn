// checking if we're on exact page or on nested child one.
// main page supposed to be excluded from nested children pages check
// (every page is child relative to main page `/`), so by adding another slash in second
// condition we're just broking it (`//...` will never be the case, it's already done).
export default (navigation, pathname) => Object.keys(navigation).find(x => x === pathname
        || pathname.indexOf(`${x}/`) === 0
        || (~x.indexOf('porn-star') && pathname.indexOf(`${x.slice(0, -1)}/`) === 0)
        || (~x.indexOf('favorite') && pathname.indexOf(`${x}-`) === 0)
    ) || false
