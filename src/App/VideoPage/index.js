// TODO: this page needs refactoring (propTypes, ig, g, etc)
import {Record} from 'immutable'
import React from 'react'
import {Link} from 'react-router-dom'
import {compose, lifecycle, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import {reduxForm, reset as resetForm} from 'redux-form/immutable'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography, Button, Chip} from '@material-ui/core'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import HomeIcon from '@material-ui/icons/Home'
import ReportIcon from '@material-ui/icons/Report'

import {
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
    getRouterContext,
    PropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpointMD as md,
} from '../helpers'

import {routerGetters} from '../../router-builder'

import {immutableI18nButtonsModel} from '../models'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ErrorContent from '../../generic/ErrorContent'
import PageTextHelmet from '../../generic/PageTextHelmet'
import VideoList from '../../generic/VideoList'
import ReportDialog from './ReportDialog'

import headerActions from '../MainHeader/actions'
import actions from './actions'
import appActions from '../actions'
import {muiStyles} from './assets/muiStyles'

import {
    Page,
    Content,
    PageWrapper,
    PlayerSection,
    VideoPlayer,
    VideoWrapper,
    Video,
    ControlPanel,
    ControlPanelBlock,
    Advertisement,
    RelatedVideos,
    BottomAdvertisement,
    InlineAdvertisementWrapper,
    InlineAdvertisement,
    CloseAdvertisement,
    AdGag,
    TagsWrapper,
    SponsorLink,
    VideoIframe,
    AdIframeWrapper,
    AdIframe,
} from './assets'

const
    fieldNamesArray = ['op', '_cid', '_gid', '_url'], // hidden field names for report request

    VideoPageRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        reportIsSending: null,
        reportIsSent: null,
        reportIsNotSent: null,

        lastPageRequestParams: null,

        inlineAdvertisementIsShowed: null,
        reportDialogIsOpen: null,
        pageText: null,
        gallery: null,
        videoList: null,
        currentHref: null,
        currentTime: null,
    }),

    renderFavoriteButton = (
        classes, data, favoriteVideoList,
        addVideoToFavoriteHandler, removeVideoFromFavoriteHandler, i18nButtons,
    ) => favoriteVideoList.find(id => id === data.getIn(['gallery', 'id']))
        ? <Button
            variant="contained"
            color="primary"
            classes={{
                root: classes.buttonFavorite
            }}
            onClick={removeVideoFromFavoriteHandler.bind(this, data.getIn(['gallery', 'id']))}
        >
            <Favorite
                classes={{root: classes.favoriteIcon}}
            />
            {ig(i18nButtons, 'removeFromFavorite')}
        </Button>
        : <Button
            variant="contained"
            color="primary"
            classes={{
                root: classes.buttonFavorite
            }}
            onClick={addVideoToFavoriteHandler.bind(this, data.get('gallery').deleteAll(
                ['published', 'classId', 'sponsorUrl', 'urlForIframe']
            ))}
        >
            <FavoriteBorder
                classes={{root: classes.favoriteBorderIcon}}
            />
            {ig(i18nButtons, 'addToFavorite')}
        </Button>,

    renderIframe = (src, currentWidth, isVideo) =>
        isVideo === 'isVideo'
            ? <VideoIframe
                title={src}
                src={src}
                frameBorder="0"
            />
            : process.env.NODE_ENV === 'production'
            ? <AdIframeWrapper currentWidth={currentWidth}>
                <AdIframe
                    title={src}
                    src={`https://videosection.com/_ad#str-eng-1545--${src}`}
                    currentWidth={currentWidth}
                    frameBorder="0"
                />
            </AdIframeWrapper>
            : <AdGag currentWidth={currentWidth}/>,

    renderTag = (classes, cb, x, getTagLink) => <Link
        to={getTagLink(x)}
        key={x}
        className={classes.routerLink}
    >
        <Chip
            label={x}
            className={classes.chip}
            component="div"
            variant="outlined"
            color={
                ccb(cb, sm) === -1
                    ? 'primary'
                    : 'secondary'
            }
            clickable
        />
    </Link>,

    ProvidedBy = ({classes, i18nLabelProvidedBy, data, withLabel = false}) => <Typography
        variant="body1"
        classes={{
            root: classes.typographySponsor
        }}
    >
        {withLabel
            ? `${i18nLabelProvidedBy}: `
            : null}
        <SponsorLink
            href={data.getIn(['gallery', 'sponsorUrl'])}
            target="_blank"
            rel="noopener noreferrer"
        >
            {`itIsJustGag${data.getIn(['gallery', 'sponsorId'])}`}
        </SponsorLink>
    </Typography>,

    VideoPage = ({
        classes, isSSR, data, favoriteVideoList, closeAdvertisementHandler,
        addVideoToFavoriteHandler, removeVideoFromFavoriteHandler,
        toggleReportDialogHandler, getTagLink, pageUrl,
        handleSubmit, pristine, reset, cb, currentWidth, i18nButtons, i18nRelatedVideo,
        i18nLabelProvidedBy,
    }) => <Page>
        { data.get('isFailed')
            ? <ErrorContent/>
            : data.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageTextHelmet pageText={ig(data, 'pageText')}/>
                <PageWrapper>
                    <PlayerSection>
                        <Typography
                            variant="h4"
                            gutterBottom
                            classes={{
                                root: classes.typographyTitle
                            }}
                        >
                            {`${data.getIn(['gallery', 'title'])} ${
                                data.getIn(['pageText', 'galleryTitle'])}`}
                        </Typography>
                        {ccb(cb, sm) === -1
                            ? null
                            : <ProvidedBy
                                classes={classes}
                                data={data}
                                withLabel={true}
                                i18nLabelProvidedBy={i18nLabelProvidedBy}
                            />}
                        <VideoPlayer>
                            <VideoWrapper>
                                <Video>
                                    {(data.get('inlineAdvertisementIsShowed') && !isSSR)
                                        ? <InlineAdvertisementWrapper>
                                            <InlineAdvertisement
                                                currentWidth={currentWidth}
                                            >
                                                <CloseAdvertisement
                                                    onClick={closeAdvertisementHandler}
                                                />
                                                {renderIframe('invideo', currentWidth)}
                                            </InlineAdvertisement>
                                        </InlineAdvertisementWrapper>
                                        : null}
                                    {renderIframe(
                                        data.getIn(['gallery', 'urlForIframe']),
                                        null,
                                        'isVideo'
                                    )}
                                </Video>
                                <ControlPanel>
                                    <ControlPanelBlock>
                                        {!isSSR
                                            ? renderFavoriteButton(
                                                classes, data, favoriteVideoList,
                                                addVideoToFavoriteHandler,
                                                removeVideoFromFavoriteHandler, i18nButtons,
                                            )
                                            : null}
                                        <Link to="/" className={classes.routerLink}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                classes={{
                                                    root: classes.buttonRoot
                                                }}
                                            >
                                                <HomeIcon
                                                    classes={{root: classes.homeIcon}}
                                                />
                                                {ig(i18nButtons, 'backToMainPage')}
                                            </Button>
                                        </Link>
                                        {ccb(cb, sm) === -1
                                            ? <ProvidedBy
                                                classes={classes}
                                                data={data}
                                            />
                                            : null}
                                    </ControlPanelBlock>
                                    <ControlPanelBlock>
                                        {!isSSR
                                            ? <Button
                                                variant="contained"
                                                color="primary"
                                                classes={{
                                                    root: classes.buttonReport
                                                }}
                                                onClick={toggleReportDialogHandler}
                                            >
                                                <ReportIcon
                                                    classes={{root: classes.reportIcon}}
                                                />
                                                {ig(i18nButtons, 'report')}
                                            </Button>
                                            : null}
                                    </ControlPanelBlock>
                                </ControlPanel>
                            </VideoWrapper>
                            <Advertisement>
                                {renderIframe('sidebar1', currentWidth)}
                                {renderIframe('sidebar2', currentWidth)}
                            </Advertisement>
                            {ccb(cb, sm) === -1
                                ? null
                                : <TagsWrapper>
                                {data.getIn(['gallery', 'tags'])
                                    ? data.getIn(['gallery', 'tags']).map(x =>
                                        renderTag(classes, cb, x, getTagLink))
                                    : null}
                            </TagsWrapper>}
                        </VideoPlayer>
                    </PlayerSection>
                    <RelatedVideos>
                        <Typography
                            variant="h4"
                            gutterBottom
                            classes={{
                                root: classes.typographyTitle
                            }}
                        >
                            {i18nRelatedVideo}
                        </Typography>
                        <VideoList
                            videoList={data.get('videoList')}
                        />
                    </RelatedVideos>
                    <BottomAdvertisement>
                        {renderIframe('bottom1', currentWidth)}
                        {renderIframe('bottom2', currentWidth)}
                        {ccb(cb, md) === -1
                            ? null
                            : renderIframe('bottom3', currentWidth)}
                    </BottomAdvertisement>
                </PageWrapper>
                <ReportDialog
                    i18nButtons={i18nButtons}
                    data={data}
                    toggleReportDialogHandler={toggleReportDialogHandler}
                    pageUrl={pageUrl}
                    fieldNamesArray={fieldNamesArray}
                    handleSubmit={handleSubmit}
                    pristine={pristine}
                    reset={reset}
                />
            </Content>
        }
    </Page>,

    loadPageFlow = ({data, loadPage, setHeaderText, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(data, pageRequestParams))
            loadPage(pageRequestParams)
        else if (ig(data, 'isLoaded'))
            setHeaderText(getHeaderText(g(data, []), true, false))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            data: VideoPageRecord(state.getIn(['app', 'videoPage'])),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
            routerContext: getRouterContext(state),
            pageUrl: state.getIn(['router', 'location', 'pathname']),
            favoriteVideoList: state.getIn(['app', 'ui', 'favoriteVideoList']),
            initialValues: { // Setting default form values. redux-form creates keys in store for this
                [fieldNamesArray[0]]: 'abuse_report',
                [fieldNamesArray[1]]: state.getIn(['app', 'videoPage', 'gallery', 'classId']),
                [fieldNamesArray[2]]: state.getIn(['app', 'videoPage', 'gallery', 'id']),
                [fieldNamesArray[3]]: state.getIn(['app', 'videoPage', 'currentHref']),
                'report-reason': 'reason_nothing',
            },
            currentWidth: state.getIn(['app', 'ui', 'currentWidth']),
            cb: state.getIn(['app', 'ui', 'currentBreakpoint']),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nRelatedVideo: ig(state, 'app', 'locale', 'i18n', 'headers', 'relatedVideo'),
            i18nLabelProvidedBy: ig(state, 'app', 'locale', 'i18n', 'labels', 'providedBy'),
            i18n: ig(state, 'app', 'locale', 'i18n', 'headers', 'relatedVideo'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
            closeAdvertisement: g(actions, 'closeAdvertisement'),
            toggleReportDialog: g(actions, 'toggleReportDialog'),
            addVideoToFavorite: g(appActions, 'addVideoToFavorite'),
            removeVideoFromFavorite: g(appActions, 'removeVideoFromFavorite'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
        setHeaderText: props => headerText => props.setNewText(g(headerText, [])),
        closeAdvertisementHandler: props => () => props.closeAdvertisement(),
        toggleReportDialogHandler: props => () => props.toggleReportDialog(),
        addVideoToFavoriteHandler: props => (video, e) => {
            e.preventDefault()
            props.addVideoToFavorite(video)
        },
        removeVideoFromFavoriteHandler: props => (id, e) => {
            e.preventDefault()
            props.removeVideoFromFavorite(id)
        },
        getTagLink: props => searchQuery => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            {searchQuery},
            ['searchQuery'],
        ),
    }),
    reduxForm({
        form: 'reportForm',
        enableReinitialize: true,
        onSubmit: (formData, dispatch) => dispatch(actions.sendReportRequest(formData)),
        onSubmitSuccess: (values, dispatch) => dispatch(resetForm('reportForm')),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        i18nButtons: immutableI18nButtonsModel,
    })
)(VideoPage)
