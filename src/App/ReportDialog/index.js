import React, {Fragment} from 'react'
import {compose, withHandlers, withPropsOnChange} from 'recompose'
import {connect} from 'react-redux'
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

import {plainProvedGet as g, immutableProvedGet as ig, setPropTypes, PropTypes} from '../helpers'
import {model, galleryModel, GalleryRecord} from './models'
import {immutableI18nButtonsModel, immutableI18nReportModel} from '../models'

import {
    VideoBlock,
    Thumb,
    Description,
    SubmitButtonWrapper,
} from './assets'

import {muiStyles} from './assets/muiStyles'
import actions from './actions'

const
    renderTableRow = (k, v, classedBounds) => <TableRow>
        <TableCell component="td" classes={g(classedBounds, 'tableCellRoot')}>{k}</TableCell>
        <TableCell component="td">{v}</TableCell>
    </TableRow>,

    renderVideoBlock = (
        classedBounds,
        i18nReport,
        gallery,
        pageUrl,
        currentHref,
        currentTime,
    ) => <VideoBlock>
        <Typography
            variant="subtitle1"
            gutterBottom
            classes={g(classedBounds, 'typographyTitle')}
        >
            {ig(gallery, 'title')}
        </Typography>
        <Thumb thumb={g(gallery, 'thumb')}/>
        <Description>
            <Paper>
                <Table>
                    <TableBody>
                        {renderTableRow(
                            ig(i18nReport, 'duration'),
                            ig(gallery, 'duration'),
                            classedBounds,
                        )}
                        {renderTableRow(
                            ig(i18nReport, 'added'),
                            ig(gallery, 'published'),
                            classedBounds,
                        )}
                        {renderTableRow(
                            ig(i18nReport, 'hosted'),
                            <a target="_blank"
                                rel="noopener noreferrer"
                                href={ig(gallery, 'sponsorUrl')}
                            >
                                {ig(gallery, 'sponsorName')}
                            </a>,
                            classedBounds,
                        )}
                        {renderTableRow(
                            ig(i18nReport, 'found'),
                            <Fragment>
                                <Link to={pageUrl}>{currentHref}</Link>
                                {` ${ig(i18nReport, 'on')} ${currentTime}`}
                            </Fragment>,
                            classedBounds,
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Description>
    </VideoBlock>,

    renderTextField = i18nReport => <TextField
        multiline
        fullWidth
        margin="normal"
        variant="filled"
        label={ig(i18nReport, 'commentLabel')}
        placeholder={ig(i18nReport, 'commentPlaceholder')}
    />,

    renderRadioButtons = (classedBounds, i18nReport, radioButtons) => <FormControl
        component="fieldset"
        classes={g(classedBounds, 'formControl')}
    >
        <FormLabel component="legend">{ig(i18nReport, 'radioLabel')}</FormLabel>
        <RadioGroup classes={g(classedBounds, 'radioGroup')}>
            {Object.keys(radioButtons).map(x => <FormControlLabel
                key={x}
                value={x}
                control={<Radio />}
                label={radioButtons[x]}
            />)}
        </RadioGroup>
    </FormControl>,

    fieldNamesArray = ['op', '_cid', '_gid', '_url'],

    ReportDialog = props => {
        const
            radioButtons = {
                reason_other: ig(props.i18nReport, 'radioButtons', 'other'),
                reason_deleted: ig(props.i18nReport, 'radioButtons', 'deleted'),
                reason_doesnt_play: ig(props.i18nReport, 'radioButtons', 'doesntPlay'),
                reason_bad_thumb: ig(props.i18nReport, 'radioButtons', 'badThumb'),
                reason_young: ig(props.i18nReport, 'radioButtons', 'young'),
                reason_incest: ig(props.i18nReport, 'radioButtons', 'incest'),
                reason_animals: ig(props.i18nReport, 'radioButtons', 'animals'),
                reason_other_scat: ig(props.i18nReport, 'radioButtons', 'otherScat'),
                reason_copyright: ig(props.i18nReport, 'radioButtons', 'copyright'),
            }

        return <Dialog
            open={ig(props.data, 'isOpen')}
            onClose={g(props, 'closeHandler')}
            maxWidth={'md'}
            aria-labelledby="report-dialog"
        >
            <form>
                <DialogTitle id="report-dialog">{ig(props.i18nReport, 'title')}</DialogTitle>
                <DialogContent>
                    {/* getting without provedGet(g) because gallery is optional */}
                    { ! props.gallery ? null : renderVideoBlock(
                        g(props, 'classedBounds'),
                        g(props, 'i18nReport'),
                        g(props, 'gallery'),
                        g(props, 'pageUrl'),
                        ig(props.data, 'currentHref'),
                        ig(props.data, 'currentTime'),
                    )}

                    {ig(props.data, 'isSent') ? null : renderRadioButtons(
                        g(props, 'classedBounds'),
                        g(props, 'i18nReport'),
                        radioButtons,
                    )}

                    {ig(props.data, 'isSent')
                        ? <DialogContentText classes={g(props.classedBounds, 'dialogSuccessText')}>
                            {ig(props.i18nReport, 'successText')}
                        </DialogContentText>
                        : <DialogContentText>
                            {ig(props.i18nReport, 'text')}
                        </DialogContentText>}

                    {ig(props.data, 'isSent') ? null : renderTextField(g(props, 'i18nReport'))}

                    { ! ig(props.data, 'isNotSent') ? null :
                        <DialogContentText classes={g(props.classedBounds, 'dialogFailureText')}>
                            {ig(props.i18nReport, 'failureText')}
                        </DialogContentText>}

                    {fieldNamesArray.map(x => <input key={x} name={x} type="hidden"/>)}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={g(props, 'closeHandler')}
                        disabled={ig(props.data, 'isSending')}
                        color="primary"
                    >
                        {ig(props.i18nButtons, 'cancel')}
                    </Button>

                    {ig(props.data, 'isSent') ? null : <SubmitButtonWrapper>
                        <Button
                            disabled={ig(props.data, 'isSending')}
                            type="submit"
                            color="primary"
                        >
                            {ig(props.i18nButtons, 'report')}
                        </Button>
                        { ! ig(props.data, 'isSending') ? null :
                            <CircularProgress
                                size={24}
                                classes={g(props.classedBounds, 'buttonProgress')}
                            />}
                    </SubmitButtonWrapper>}
                </DialogActions>
            </form>
        </Dialog>
    }

export default compose(
    connect(
        state => {
            const
                currentSection = ig(state, 'app', 'mainHeader', 'navigation', 'currentSection'),
                result = {
                    data: ig(state, 'app', 'reportDialog'),
                    i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
                    i18nReport: ig(state, 'app', 'locale', 'i18n', 'report'),
                    pageUrl: ig(state, 'router', 'location', 'pathname'),
                }

            if (currentSection === 'video')
                result.gallery = GalleryRecord(ig(state, 'app', 'videoPage', 'gallery'))
                // this Record above needs because we don't need all data from original gallery
            return result
        },
        {
            toggleReportDialog: g(actions, 'toggleReportDialog'),
        }
    ),
    withHandlers({
        closeHandler: props => () => props.toggleReportDialog()
    }),
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            typographyTitle: Object.freeze({root: g(props, 'classes', 'typographyTitle')}),
            tableCellRoot: Object.freeze({root: g(props, 'classes', 'tableCellRoot')}),
            formControl: Object.freeze({root: g(props, 'classes', 'formControl')}),
            radioGroup: Object.freeze({root: g(props, 'classes', 'radioGroup')}),
            dialogSuccessText: Object.freeze({root: g(props, 'classes', 'dialogSuccessText')}),
            dialogFailureText: Object.freeze({root: g(props, 'classes', 'dialogFailureText')}),
            buttonProgress: Object.freeze({root: g(props, 'classes', 'buttonProgress')}),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.shape({
            typographyTitle: PropTypes.string,
            tableCellRoot: PropTypes.string,
            formControl: PropTypes.string,
            radioGroup: PropTypes.string,
            dialogSuccessText: PropTypes.string,
            dialogFailureText: PropTypes.string,
            buttonProgress: PropTypes.string,
        }),

        classedBounds: PropTypes.exact({
            typographyTitle: PropTypes.object,
            tableCellRoot: PropTypes.object,
            formControl: PropTypes.object,
            radioGroup: PropTypes.object,
            dialogSuccessText: PropTypes.object,
            dialogFailureText: PropTypes.object,
            buttonProgress: PropTypes.object,
        }),

        data: model,
        gallery: galleryModel.isOptional,
        i18nButtons: immutableI18nButtonsModel,
        i18nReport: immutableI18nReportModel,
        pageUrl: PropTypes.string,

        toggleReportDialog: PropTypes.func,
        closeHandler: PropTypes.func,
    }),
)(ReportDialog)
