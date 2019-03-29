export const
    // `callStackGetter` supposed to be (() => new Error().stack) in place where it's called,
    // otherwise it's hard to debug which request is caused an exception.
    fetchResponseExtractor = callStackGetter => response => {
        if ( ! response.ok)
            throw new Error(
                `Response is not OK (status code is ${response.status}), ` +
                `call stack: ${callStackGetter()}`
            )

        return response.json()
    }
