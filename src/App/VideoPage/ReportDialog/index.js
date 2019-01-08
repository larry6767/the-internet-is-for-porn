import React, {Component, Fragment} from 'react'
import {Field} from 'redux-form/immutable'
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
    </TableRow>,

    renderTextField = ({
        label,
        input,
        meta: {touched, invalid, error},
        ...custom
    }) => <TextField
        multiline
        fullWidth
        margin="normal"
        variant="filled"
        label={label}
        placeholder="Describe the problem"
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />,

    renderRadioButtons = ({classes, radioButtons, input, ...rest}) => <FormControl
        component="fieldset"
        className={classes.formControl}
    >
        <FormLabel component="legend">Report reason:</FormLabel>
        <RadioGroup {...input} {...rest}>
            {Object.keys(radioButtons).map(x => <FormControlLabel
                key={x}
                value={x}
                control={<Radio />}
                label={radioButtons[x]}
            />)}
        </RadioGroup>
    </FormControl>,

    renderHiddenField = ({
        input,
        label,
        type,
    }) => <input {...input} type={type} placeholder={label}/>,

    ReportDialog = ({
        classes,
        data,
        toggleReportDialogHandler,
        pageUrl,
        fieldNamesArray,
        handleSubmit,
        pristine,
        submitting,
        reset,
    }) => {
        const
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
            },

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
            }

        return <Dialog
            open={data.get('reportDialogIsOpen')}
            onClose={toggleReportDialogHandler}
            maxWidth={'md'}
            aria-labelledby="report-dialog"
        >
            <form
                name="report-form"
                onSubmit={handleSubmit}
            >
                {fieldNamesArray.map(x => <Field
                    key={x}
                    name={x}
                    component={renderHiddenField}
                    type="hidden"
                />)}

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
                    <Field
                        name="report-reason"
                        classes={classes}
                        radioButtons={radioButtons}
                        className={classes.group}
                        component={renderRadioButtons}
                    />
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
                    <Field
                        name="report-comment"
                        label="Comment"
                        type="text"
                        component={renderTextField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            reset()
                            toggleReportDialogHandler()}
                        }
                        disabled={submitting}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={pristine || submitting}
                        type="submit"
                        color="primary">
                        Report
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    }

export default withStyles(muiStyles)(ReportDialog)
