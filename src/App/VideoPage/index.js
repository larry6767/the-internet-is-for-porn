// TODO: this page needs refactoring (propTypes, ig, g, etc)
import {Record, Map, List} from 'immutable'
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
    PropTypes,
    getSubPage,
    setPropTypes,
    getRouterContext,
} from '../helpers'

import {routerGetters} from '../../router-builder'

import {
    immutableI18nButtonsModel,
    orientationCodes,
    PageTextRecord,
} from '../models'
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
} from './assets'

const
    fieldNamesArray = ['op', '_cid', '_gid', '_url'], // hidden field names for report request
    VideoPageRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        reportIsSending: false,
        reportIsSent: false,
        reportIsNotSent: false,

        lastOrientationCode: '',
        lastSubPageForRequest: '',
        inlineAdvertisementIsShowed: true,
        reportDialogIsOpen: false,
        pageText: PageTextRecord(),
        gallery: Map(),
        videoList: List(),
        currentHref: '',
        currentTime: '',
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

    renderIframe = (src, isAd) =>
        (!(process.env.NODE_ENV !== 'production' && isAd === 'isAd') || isAd !== 'isAd')
            ? <iframe
                title={src}
                src={src}
                frameBorder="0"
            ></iframe>
            : <AdGag/>,

    renderTag = (classes, currentBreakpoint, x, getTagLink) => <Link
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
                currentBreakpoint === 'xxs' || currentBreakpoint === 'xs'
                    ? 'primary'
                    : 'secondary'
            }
            clickable
        />
    </Link>,

    VideoPage = ({
        classes, isSSR, data, favoriteVideoList, closeAdvertisementHandler,
        addVideoToFavoriteHandler, removeVideoFromFavoriteHandler,
        toggleReportDialogHandler, getTagLink, pageUrl,
        handleSubmit, pristine, reset, currentBreakpoint, i18nButtons,
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
                            classes={{
                                root: classes.typographyTitle
                            }}
                        >
                            {`${data.getIn(['gallery', 'title'])} ${
                                data.getIn(['pageText', 'galleryTitle'])}`}
                        </Typography>
                        <Typography
                            variant="body1"
                            classes={{
                                root: classes.typographySponsor
                            }}
                        >
                            {'provided by: '}
                            <SponsorLink
                                href={data.getIn(['gallery', 'sponsorUrl'])}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {`itIsJustGag${data.getIn(['gallery', 'sponsorId'])}`}
                            </SponsorLink>
                        </Typography>
                        <VideoPlayer>
                            <VideoWrapper>
                                <Video>
                                    {(data.get('inlineAdvertisementIsShowed') && !isSSR)
                                        ? <InlineAdvertisementWrapper>
                                            <InlineAdvertisement>
                                                <CloseAdvertisement
                                                    onClick={closeAdvertisementHandler}
                                                />
                                                {renderIframe(
                                                    'https://videosection.com/_ad#str-eng-1545--invideo',
                                                    'isAd'
                                                )}
                                            </InlineAdvertisement>
                                        </InlineAdvertisementWrapper>
                                        : null}
                                    {renderIframe(data.getIn(['gallery', 'urlForIframe']))}
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
                                    </ControlPanelBlock>
                                    <ControlPanelBlock>
                                        {!isSSR
                                            ? <Button
                                                variant="contained"
                                                color="primary"
                                                classes={{
                                                    root: classes.buttonRoot
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
                                {renderIframe(
                                    'https://videosection.com/_ad#str-eng-1545--sidebar1',
                                    'isAd'
                                )}
                                {renderIframe(
                                    'https://videosection.com/_ad#str-eng-1545--sidebar2',
                                    'isAd'
                                )}
                            </Advertisement>
                            {currentBreakpoint === 'xs' || currentBreakpoint === 'xxs'
                                ? null
                                : <TagsWrapper>
                                {data.getIn(['gallery', 'tags'])
                                    ? data.getIn(['gallery', 'tags']).map(x =>
                                        renderTag(classes, currentBreakpoint, x, getTagLink))
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
                            {'Click On Each Of These Related Films'}
                        </Typography>
                        <VideoList
                            videoList={data.get('videoList')}
                        />
                    </RelatedVideos>
                    <BottomAdvertisement>
                        {renderIframe('https://videosection.com/_ad#str-eng-1545--bottom1', 'isAd')}
                        {renderIframe('https://videosection.com/_ad#str-eng-1545--bottom2', 'isAd')}
                        {renderIframe('https://videosection.com/_ad#str-eng-1545--bottom3', 'isAd')}
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

    loadPageFlow = ({match, data, loadPage, setHeaderText, currentOrientation}) => {
        const
            subPageForRequest = getSubPage(`${match.params.child}/${match.params.name}`)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            data.get('isLoading') ||
            (
                (data.get('isLoaded') || data.get('isFailed')) &&
                g(currentOrientation, []) === ig(data, 'lastOrientationCode') &&
                subPageForRequest === ig(data, 'lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
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
            pageUrl: state.getIn(['router', 'location', 'pathname']),
            favoriteVideoList: state.getIn(['app', 'ui', 'favoriteVideoList']),
            initialValues: { // Setting default form values. redux-form creates keys in store for this
                [fieldNamesArray[0]]: 'abuse_report',
                [fieldNamesArray[1]]: state.getIn(['app', 'videoPage', 'gallery', 'classId']),
                [fieldNamesArray[2]]: state.getIn(['app', 'videoPage', 'gallery', 'id']),
                [fieldNamesArray[3]]: state.getIn(['app', 'videoPage', 'currentHref']),
                'report-reason': 'reason_nothing',
            },
            currentBreakpoint: state.getIn(['app', 'ui', 'currentBreakpoint']),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            routerContext: getRouterContext(state)
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
        loadPage: props => subPageForRequest => props.loadPageRequest({
            orientationCode: g(props, 'currentOrientation'),
            subPageForRequest: g(subPageForRequest, []),
        }),

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
        currentOrientation: PropTypes.oneOf(orientationCodes),
    })
)(VideoPage)
