import {BACKEND_URL} from '../../config'

export default reqBody => fetch(`${BACKEND_URL}/get-page-data`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
    body: JSON.stringify(reqBody),
}).then(response => {
    if (response.status !== 200)
        throw new Error(`Response status is ${response.status} (not 200)`)

    return response.json()
})
