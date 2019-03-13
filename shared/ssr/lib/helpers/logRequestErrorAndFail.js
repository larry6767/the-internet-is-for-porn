export default (req, res) => err => {
    logRequestError(req)(err)
    return res.status(500).end('Internal server error')
}
