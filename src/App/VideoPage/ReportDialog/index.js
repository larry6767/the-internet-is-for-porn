import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {
    Typography,
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
    TextField,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core'
import {
    VideoBlock,
    Thumb,
    Description,
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    radioButtons = {
        reason_other: 'Other',
        reason_deleted: 'Movie has been deleted',
        reason_doesnt_play: 'Movie doesn\'t play',
        reason_bad_thumb: 'Low quality of the thumbnail',
        reason_young: 'Person on the thumbnail looks too young',
        reason_incest: 'Incest',
        reason_animals: 'Beastiality (sex with animals)',
        reason_other_scat: 'Other inappropriate content (rape, blood, scat, etc...)',
        reason_copyright: 'Copyright violation',
    },

    renderTableRow = (x, classes, tableData) => <TableRow key={x}>
        <TableCell
            component="td"
            classes={{
                root: classes.tableCellRoot
            }}
        >
            {x}
        </TableCell>
        <TableCell component="td">{tableData[x]}</TableCell>
    </TableRow>

class ReportDialog extends Component {
    state = {
        value: '',
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }

    render() {
        const {
            classes,
            sendReportHandler,
            data,
            toggleReportDialogHandler,
            pageUrl,
        } = this.props,

            tableData = {
                'Duration': data.getIn(['gallery', 'duration']),
                'Added': data.getIn(['gallery', 'published']),
                'Hosted by': <a target="_blank"
                    rel="noopener noreferrer"
                    href={data.getIn(['gallery', 'sponsorUrl'])}
                >
                    {data.getIn(['gallery', 'sponsorId'])}
                </a>,
                'Found on page': <Fragment>
                    {<Link to={pageUrl}>{data.get('currentHref')}</Link>}
                    {` on ${data.get('currentTime')}`}
                </Fragment>,
            }

        return <Dialog
            open={data.get('reportDialogIsOpen')}
            onClose={toggleReportDialogHandler}
            maxWidth={'md'}
            // scroll="body"
            aria-labelledby="report-dialog"
        >
            <DialogTitle id="report-dialog">
                {'Have you found a problem on the site? \
                Please use this form to help us to fix it, or contact us directly'}
            </DialogTitle>
            <DialogContent>
                <VideoBlock>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {data.getIn(['gallery', 'title'])}
                    </Typography>
                    <Thumb thumb={data.getIn(['gallery', 'thumb'])}/>
                    <Description>
                        <Paper>
                            <Table>
                                <TableBody>
                                    {Object.keys(tableData).map(x =>
                                        renderTableRow(x, classes, tableData))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Description>
                </VideoBlock>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Report reason:</FormLabel>
                    <RadioGroup
                        aria-label="reason"
                        name="reason"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {Object.keys(radioButtons).map(x => <FormControlLabel
                            key={x}
                            value={x}
                            control={<Radio />}
                            label={radioButtons[x]}
                        />)}
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
                <TextField
                    id="filled-textarea"
                    label="Comment"
                    placeholder="Describe the problem"
                    multiline
                    fullWidth
                    margin="normal"
                    variant="filled"
                />
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
