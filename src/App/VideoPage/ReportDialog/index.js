// TODO: this page needs refactoring
import React, {Fragment} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
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

import {immutableProvedGet as ig, setPropTypes} from '../../helpers'

import {
    immutableI18nButtonsModel,
    immutableI18nReportModel
} from '../../models'

import {
    VideoBlock,
    Thumb,
    Description,
    SubmitButtonWrapper,
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
        i18nReport,
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
        placeholder={ig(i18nReport, 'commentPlaceholder')}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />,

    renderRadioButtons = ({classes, i18nReport, radioButtons, input, ...rest}) => <FormControl
        component="fieldset"
        className={classes.formControl}
    >
        <FormLabel component="legend">{ig(i18nReport, 'radioLabel')}</FormLabel>
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
        i18nButtons,
        i18nReport,
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
                [ig(i18nReport, 'duration')]: data.getIn(['gallery', 'duration']),
                [ig(i18nReport, 'added')]: data.getIn(['gallery', 'published']),
                [ig(i18nReport, 'hosted')]: <a target="_blank"
                    rel="noopener noreferrer"
                    href={data.getIn(['gallery', 'sponsorUrl'])}
                >
                    {data.getIn(['gallery', 'sponsorId'])}
                </a>,
                [ig(i18nReport, 'found')]: <Fragment>
                    {<Link to={pageUrl}>{data.get('currentHref')}</Link>}
                    {` ${ig(i18nReport, 'on')} ${data.get('currentTime')}`}
                </Fragment>,
            },

            radioButtons = {
                reason_other: ig(i18nReport, 'radioButtons', 'other'),
                reason_deleted: ig(i18nReport, 'radioButtons', 'deleted'),
                reason_doesnt_play: ig(i18nReport, 'radioButtons', 'doesntPlay'),
                reason_bad_thumb: ig(i18nReport, 'radioButtons', 'badThumb'),
                reason_young: ig(i18nReport, 'radioButtons', 'young'),
                reason_incest: ig(i18nReport, 'radioButtons', 'incest'),
                reason_animals: ig(i18nReport, 'radioButtons', 'animals'),
                reason_other_scat: ig(i18nReport, 'radioButtons', 'otherScat'),
                reason_copyright: ig(i18nReport, 'radioButtons', 'copyright'),
            }

        return <Dialog
            open={data.get('reportDialogIsOpen')}
            onClose={toggleReportDialogHandler}
            maxWidth={'md'}
            aria-labelledby="report-dialog"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="report-dialog">
                    {ig(i18nReport, 'title')}
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

                    {!data.get('reportIsSent')
                        ? <Field
                            name="report-reason"
                            classes={classes}
                            i18nReport={i18nReport}
                            radioButtons={radioButtons}
                            className={classes.group}
                            component={renderRadioButtons}
                        />
                        : null}

                    {data.get('reportIsSent')
                        ? <DialogContentText classes={{root: classes.dialogSuccessText}}>
                            {ig(i18nReport, 'successText')}
                        </DialogContentText>
                        : <DialogContentText>
                            {ig(i18nReport, 'text')}
                        </DialogContentText>}

                    {!data.get('reportIsSent')
                        ? <Field
                            name="report-comment"
                            label={ig(i18nReport, 'commentLabel')}
                            type="text"
                            component={renderTextField}
                            i18nReport={i18nReport}
                        />
                        : null}

                    {data.get('reportIsNotSent') && pristine
                        ? <DialogContentText classes={{root: classes.dialogFailureText}}>
                            {ig(i18nReport, 'failureText')}
                        </DialogContentText>
                        : null}

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
                        {ig(i18nButtons, 'cancel')}
                    </Button>

                    {!data.get('reportIsSent')
                        ? <SubmitButtonWrapper>
                            <Button
                                disabled={pristine || data.get('reportIsSending')}
                                type="submit"
                                color="primary"
                            >
                                {ig(i18nButtons, 'report')}
                            </Button>
                            {data.get('reportIsSending')
                                ? <CircularProgress size={24} className={classes.buttonProgress}/>
                                : null}
                        </SubmitButtonWrapper>
                        : null}

                </DialogActions>
            </form>
        </Dialog>
    }

export default compose(
    connect(
        state => ({
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nReport: ig(state, 'app', 'locale', 'i18n', 'report'),
        }),
    ),
    withStyles(muiStyles),
    setPropTypes({
        i18nButtons: immutableI18nButtonsModel,
        i18nReport: immutableI18nReportModel,
    }),
)(ReportDialog)
