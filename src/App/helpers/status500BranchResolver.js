// boolean branch of store which resolves to 500 status code on server-side rendering
export default branch => x => x.getIn(branch) ? 500 : 200
