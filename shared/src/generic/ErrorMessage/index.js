import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import {withStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'

// local libs
import {muiStyles} from 'src/generic/ErrorMessage/assets/muiStyles'
import actions from 'src/generic/ErrorMessage/actions'

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
