import ig from 'src/App/helpers/immutable/provedGet'

// boolean branch of store which resolves to 500 status code on server-side rendering
export default branch => x => ig(x, branch) ? 500 : 200
