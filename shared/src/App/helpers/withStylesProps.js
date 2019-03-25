import React from 'react'
import {withStyles} from '@material-ui/core/styles'

export default styles => Component => props => {
    const Comp = withStyles(theme => styles(theme, props))(Component)
    return <Comp {...props} />
}
