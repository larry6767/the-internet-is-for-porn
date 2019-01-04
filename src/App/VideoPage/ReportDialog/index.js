import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from '@material-ui/core'
import {muiStyles} from './assets/muiStyles'

class ReportDialog extends Component {
    state = {
        value: 'female',
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    }

    render() {
        const {
            classes,
            sendReportHandler,
            isOpen,
            toggleReportDialogHandler,
        } = this.props
        return <Dialog
            open={isOpen}
            onClose={toggleReportDialogHandler}
            // scroll="body"
            aria-labelledby="report-dialog"
        >
            <DialogTitle id="report-dialog">
                {'Have you found a problem on the site? \
                Please use this form to help us to fix it, or contact us directly'}
            </DialogTitle>
            <DialogContent>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="(Disabled option)"
                        />
                    </RadioGroup>
                </FormControl>
                <DialogContentText>
                    {'Take Note of: Our website is a completely automatic adult search \
                    engine focused on videos clips. We do not possess, produce, distribute \
                    or host any movies. All linked clips are automatically gathered and \
                    added into our system by our spider script. Thumbnails are \
                    auto-generated from the outside video contributors. All of the video \
                    content performed on our site are hosted and created by other websites \
                    that are not under our control. By your request we can remove \
                    thumbnail and link to the video, but not the original video file.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleReportDialogHandler} color="primary">
                    Cancel
                </Button>
                <Button onClick={sendReportHandler} color="primary">
                    Report
                </Button>
            </DialogActions>
        </Dialog>
    }
}

export default withStyles(muiStyles)(ReportDialog)
