export default req => err =>
    console.error(
        '[%s] Some unexpected exception is thrown:', new Date(), err, '\n',
        '  Request method:', req.method, '\n',
        '  Request URL:', req.url, '\n',
        '  Request body:', req.body, '\n',
        '  Request headers:', req.headers
    )
