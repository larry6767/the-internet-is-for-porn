import {includes} from 'lodash'
import React, {Fragment} from 'react'
import {compose, withHandlers, withState, withPropsOnChange} from 'recompose'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes
} from 'src/App/helpers'

import {model, galleryModel, GalleryRecord} from 'src/App/ReportDialog/models'
import {immutableI18nButtonsModel, immutableI18nReportModel} from 'src/App/models'
import {VideoBlock, Thumb, Description, SubmitButtonWrapper} from 'src/App/ReportDialog/assets'
import {muiStyles} from 'src/App/ReportDialog/assets/muiStyles'
import actions from 'src/App/ReportDialog/actions'
import {NICHE, ALL_MOVIES, PORNSTAR, VIDEO} from 'src/App/constants'

const
    renderTableRow = (k, v, classes) => <TableRow>
        <TableCell component="td" className={g(classes, 'tableCellRoot')}>{k}</TableCell>
        <TableCell component="td">{v}</TableCell>
    </TableRow>,

    renderVideoBlock = (
        classes,
        i18nReport,
        gallery,
        pageUrl,
        currentHref,
        currentTime,
    ) => <VideoBlock>
        <Typography
            variant="subtitle1"
            gutterBottom
            className={g(classes, 'typographyTitle')}
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
                            classes,
                        )}
                        {renderTableRow(
                            ig(i18nReport, 'added'),
                            ig(gallery, 'published'),
                            classes,
                        )}
                        {renderTableRow(
                            ig(i18nReport, 'hosted'),
                            <a target="_blank"
                                rel="noopener noreferrer"
                                href={ig(gallery, 'sponsorUrl')}
                            >
                                {ig(gallery, 'sponsorName')}
                            </a>,
                            classes,
                        )}
                        {renderTableRow(
                            ig(i18nReport, 'found'),
                            <Fragment>
                                <Link to={pageUrl}>{currentHref}</Link>
                                {` ${ig(i18nReport, 'on')} ${currentTime}`}
                            </Fragment>,
                            classes,
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Description>
    </VideoBlock>,

    renderTextField = (commentHandler, name, label, placeholder) => <TextField
        name={name}
        multiline
        fullWidth
        margin="normal"
        variant="filled"
        label={label}
        placeholder={placeholder}
        onChange={commentHandler}
    />,

    renderRadioButtons = (classes, i18nReport, radioButtons, handler) => <FormControl
        component="fieldset"
        className={g(classes, 'formControl')}
    >
        <FormLabel component="legend" className={g(classes, 'formLabelRoot')}>
            {ig(i18nReport, 'radioLabel')}
        </FormLabel>
        <RadioGroup name="reason" className={g(classes, 'radioGroup')} onChange={handler}>
            {Object.keys(radioButtons).map(x => <FormControlLabel
                key={x}
                value={x}
                control={<Radio />}
                label={radioButtons[x]}
            />)}
        </RadioGroup>
    </FormControl>,

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
            classes={g(props, 'classedBounds', 'dialog')}
        >
            <form onSubmit={g(props, 'sendReportRequestHandler')}>
                <DialogTitle id="report-dialog" className={g(props, 'classes', 'dialogTitleRoot')}>
                    {ig(props.i18nReport, 'title')}
                </DialogTitle>
                <DialogContent className={g(props, 'classes', 'dialogContentRoot')}>
                    {g(props, 'gallery') ? <Fragment>
                        {renderVideoBlock(
                            g(props, 'classes'),
                            g(props, 'i18nReport'),
                            g(props, 'gallery'),
                            g(props, 'pageUrl'),
                            ig(props.data, 'currentHref'),
                            ig(props.data, 'currentTime'),
                        )}
                        <input type="hidden" name="galleryId" value={ig(props.gallery, 'id')}/>
                    </Fragment>
                    : renderTextField(
                        g(props, 'userUrlHandler'),
                        'userUrl',
                        'URL',
                        ig(props.i18nReport, 'userUrlPlaceholder'),
                    )}

                    <input type="hidden" name="url" value={ig(props.data, 'currentHref')}/>

                    {ig(props.data, 'isSent') ? null : renderRadioButtons(
                        g(props, 'classes'),
                        g(props, 'i18nReport'),
                        radioButtons,
                        g(props, 'reasonHandler'),
                    )}

                    {ig(props.data, 'isSent')
                        ? <DialogContentText className={g(props, 'classes', 'dialogSuccessText')}>
                            {ig(props.i18nReport, 'successText')}
                        </DialogContentText>
                        : <DialogContentText>
                            {ig(props.i18nReport, 'text')}
                        </DialogContentText>}

                    {ig(props.data, 'isSent') ? null :
                        renderTextField(
                            g(props, 'commentHandler'),
                            'comment',
                            ig(props.i18nReport, 'commentLabel'),
                            ig(props.i18nReport, 'commentPlaceholder'),
                        )}

                    { ! ig(props.data, 'isNotSent') ? null :
                        <DialogContentText className={g(props, 'classes', 'dialogFailureText')}>
                            {ig(props.i18nReport, 'failureText')}
                        </DialogContentText>}
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
                                className={g(props, 'classes', 'buttonProgress')}
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
                pagesWithTagId = [ALL_MOVIES, NICHE, PORNSTAR],
                currentSection = ig(state, 'app', 'mainHeader', 'navigation', 'currentSection'),
                result = {
                    data: ig(state, 'app', 'reportDialog'),
                    i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
                    i18nReport: ig(state, 'app', 'locale', 'i18n', 'report'),
                    pageUrl: ig(state, 'router', 'location', 'pathname'),
                }

            result.gallery = currentSection !== VIDEO ? null :
                result.gallery = GalleryRecord(ig(state, 'app', currentSection, 'gallery'))
                // this Record above needs because we don't need all data from original gallery

            result.tagId = ! includes(pagesWithTagId, currentSection) ? null :
                result.tagId = ig(state, 'app', currentSection, 'tagId')

            return result
        },
        {
            toggleReportDialogFlow: g(actions, 'toggleReportDialogFlow'),
            sendReportRequest: g(actions, 'sendReportRequest'),
        }
    ),
    withState('userUrlValue', 'setUserUrlValue', ''),
    withState('commentValue', 'setCommentValue', ''),
    withState('reasonValue', 'setReasonValue', 'reason_nothing'),
    withHandlers({
        closeHandler: props => () => props.toggleReportDialogFlow(),

        userUrlHandler: props => event => props.setUserUrlValue(event.target.value),

        commentHandler: props => event => props.setCommentValue(event.target.value),

        reasonHandler: props => (event, x) => props.setReasonValue(x),

        sendReportRequestHandler: props => event => {
            event.preventDefault()
            const
                body = {
                    url: ig(props.data, 'currentHref'),
                    userUrl: ! g(props, 'gallery') ? g(props, 'userUrlValue') : null,
                    reason: g(props, 'reasonValue'),
                    comment: g(props, 'commentValue'),
                    galleryId: g(props, 'gallery') ? ig(props.gallery, 'id') : null,
                    tagId: g(props, 'tagId') ? g(props, 'tagId') : null,
                }

            props.sendReportRequest(body)
        }
    }),
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            dialog: Object.freeze({paper: g(props, 'classes', 'paperRoot')}),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            paperRoot: PropTypes.string,
            dialogTitleRoot: PropTypes.string,
            dialogContentRoot: PropTypes.string,
            typographyTitle: PropTypes.string,
            tableCellRoot: PropTypes.string,
            formLabelRoot: PropTypes.string,
            formControl: PropTypes.string,
            radioGroup: PropTypes.string,
            dialogSuccessText: PropTypes.string,
            dialogFailureText: PropTypes.string,
            buttonProgress: PropTypes.string,
        }),

        classedBounds: PropTypes.exact({
            dialog: PropTypes.object,
        }),

        data: model,
        tagId: PropTypes.number.isOptional,
        gallery: galleryModel.isOptional,
        i18nButtons: immutableI18nButtonsModel,
        i18nReport: immutableI18nReportModel,
        pageUrl: PropTypes.string,
        commentValue: PropTypes.string,
        reasonValue: PropTypes.string,

        toggleReportDialogFlow: PropTypes.func,
        closeHandler: PropTypes.func,
        sendReportRequestHandler: PropTypes.func,
        setCommentValue: PropTypes.func,
        setReasonValue: PropTypes.func,
    }),
)(ReportDialog)
