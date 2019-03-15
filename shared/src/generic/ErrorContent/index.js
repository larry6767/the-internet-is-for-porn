import React from 'react'

// local libs
import Typography from '@material-ui/core/Typography'
import ErrorMessage from 'src/generic/ErrorMessage'

const
    ErrorContent = () => <div>
        <Typography variant="body1" gutterBottom>Some shit is happened 8==э</Typography>
        <Typography variant="body1" gutterBottom>Please try again</Typography>
        <ErrorMessage/>
    </div>

export default ErrorContent
