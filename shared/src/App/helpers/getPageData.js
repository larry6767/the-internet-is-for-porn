import {BACKEND_URL} from 'src/config'

export default reqBody => fetch(`${BACKEND_URL}/get-page-data`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
    body: JSON.stringify(reqBody),
}).then(response => {
    if ( ! response.ok)
        throw new Error(`Response is not OK (status code is ${response.status})`)

    return response.json()
})
