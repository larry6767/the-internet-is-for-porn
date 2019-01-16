// TODO: this page needs refactoring (propTypes, ig, g, etc)
import React from 'react'
import {Link} from 'react-router-dom'
import {compose, lifecycle, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {reduxForm, reset as resetForm} from 'redux-form/immutable'
import {withStyles} from '@material-ui/core'
import {
    CircularProgress,
    Typography,
    Button,
    Chip,
} from '@material-ui/core'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import {
    Record,
    Map,
    List,
} from 'immutable'

import {
    immutableProvedGet as ig,
    PropTypes,
    getSubPage,
} from '../helpers'

import {immutableI18nButtonsModel} from '../models'
import ErrorContent from '../../generic/ErrorContent'
import VideoList from '../../generic/VideoList'
import ReportDialog from './ReportDialog'
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
import actions from './actions'
import appActions from '../actions'
import {muiStyles} from './assets/muiStyles'

const
    fieldNamesArray = ['op', '_cid', '_gid', '_url'], // hidden field names for report request
    VideoPageRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        reportIsSending: false,
        reportIsSent: false,
        reportIsNotSent: false,

        lastSubPageForRequest: '',
        inlineAdvertisementIsShowed: true,
        reportDialogIsOpen: false,
        pageText: Map(),
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
                root: classes.buttonRoot
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
                root: classes.buttonRoot
            }}
            onClick={addVideoToFavoriteHandler.bind(this, data.get('gallery'))}
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

    VideoPage = ({
        classes, isSSR, data, favoriteVideoList, closeAdvertisementHandler,
        addVideoToFavoriteHandler, removeVideoFromFavoriteHandler,
        toggleReportDialogHandler, pageUrl,
        handleSubmit, pristine, reset, currentBreakpoint, i18nButtons,
    }) => <Page>
        { data.get('isFailed')
            ? <ErrorContent/>
            : data.get('isLoading')
            ? <CircularProgress/>
            : <Content>
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
                                {data.getIn(['gallery', 'sponsorId'])}
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
                            <TagsWrapper>
                                {data.getIn(['gallery', 'tags'])
                                    ? data.getIn(['gallery', 'tags']).map(x => <Chip
                                        key={x}
                                        label={x}
                                        className={classes.chip}
                                        component="a"
                                        href="#chip"
                                        variant="outlined"
                                        color={
                                            currentBreakpoint === 'xxs' || currentBreakpoint === 'xs'
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        clickable
                                    />)
                                    : null}
                            </TagsWrapper>
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

    loadPageFlow = ({match, data, loadPage}) => {
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
                subPageForRequest === data.get('lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
    }

export default compose(
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
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
        }),
        dispatch => ({
            loadPage: subPageForRequest => dispatch(actions.loadPageRequest(subPageForRequest)),
            closeAdvertisementHandler: () => dispatch(actions.closeAdvertisement()),
            toggleReportDialogHandler: () => dispatch(actions.toggleReportDialog()),
            addVideoToFavoriteHandler: (video, e) => {
                e.preventDefault()
                dispatch(appActions.addVideoToFavorite(video))
            },
            removeVideoFromFavoriteHandler: (id, e) => {
                e.preventDefault()
                dispatch(appActions.removeVideoFromFavorite(id))
            },
        })
    ),
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
    setPropTypes({
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        i18nButtons: immutableI18nButtonsModel,
    })
)(VideoPage)
