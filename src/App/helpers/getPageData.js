import {BACKEND_URL} from '../../config'

export default reqData => fetch(`${BACKEND_URL}/get-page-data`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
    body: JSON.stringify(reqData),
})
