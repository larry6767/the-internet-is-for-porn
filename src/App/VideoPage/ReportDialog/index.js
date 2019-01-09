import React, {Fragment} from 'react'
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
    CircularProgress,
} from '@material-ui/core'
import {
    VideoBlock,
    Thumb,
    Description,
    SubmitButtonWrapper,
} from './assets'
import {muiStyles} from './assets/muiStyles'
import fixtures from './fixtures'

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

            radioButtons = fixtures.radioButtons

        return <Dialog
            open={data.get('reportDialogIsOpen')}
            onClose={toggleReportDialogHandler}
            maxWidth={'md'}
            aria-labelledby="report-dialog"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="report-dialog">
                    {fixtures.dialogTitle}
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

                    {!data.get('reportIsSent') &&
                        <Field
                            name="report-reason"
                            classes={classes}
                            radioButtons={radioButtons}
                            className={classes.group}
                            component={renderRadioButtons}
                        />}

                    {data.get('reportIsSent')
                        ? <DialogContentText classes={{root: classes.dialogSuccessText}}>
                            {fixtures.dialogSuccessText}
                        </DialogContentText>
                        : <DialogContentText>
                            {fixtures.dialogText}
                        </DialogContentText>}

                    {!data.get('reportIsSent') &&
                        <Field
                            name="report-comment"
                            label="Comment"
                            type="text"
                            component={renderTextField}
                        />}

                    {data.get('reportIsNotSent') &&
                        <DialogContentText classes={{root: classes.dialogFailureText}}>
                            {fixtures.dialogFailureText}
                        </DialogContentText>}

                    {fieldNamesArray.map(x => <Field
                        key={x}
                        name={x}
                        component={renderHiddenField}
                        type="hidden"
                    />)}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            reset()
                            toggleReportDialogHandler()}
                        }
                        disabled={data.get('reportIsSending')}
                        color="primary"
                    >
                        Cancel
                    </Button>

                    {!data.get('reportIsSent') &&
                        <SubmitButtonWrapper>
                            <Button
                                disabled={pristine || data.get('reportIsSending')}
                                type="submit"
                                color="primary"
                            >
                                Report
                            </Button>
                            {data.get('reportIsSending') &&
                                <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </SubmitButtonWrapper>}

                </DialogActions>
            </form>
        </Dialog>
    }

export default withStyles(muiStyles)(ReportDialog)
