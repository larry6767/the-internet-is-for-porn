import React from 'react'
import {Snackbar, SnackbarContent} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import actions from './actions'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import {muiStyles} from './assets/muiStyles'

const
    ErrorMessage = ({classes, isOpen, onClose}) => <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        open={isOpen}
        onClose={onClose}
        autoHideDuration={5000}
    >
        <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                <ErrorIcon className={classes.iconVariant} />
                    Some shit is happened 8==э
                </span>
            }
            action={[
                <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
        />
    </Snackbar>

export default compose(
    connect(
        state => ({
            isOpen: state.getIn(['generic', 'errorMessage', 'isOpen'])
        }),
        dispatch => ({
            onClose: (event, value) => dispatch(actions.closeErrorMessage())
        })
    ),
    withStyles(muiStyles)
)(ErrorMessage)
