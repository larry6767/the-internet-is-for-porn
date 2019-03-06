import React, {Fragment} from 'react'
import {compose, withHandlers, withState} from 'recompose'
import {connect} from 'react-redux'
import {animateScroll} from 'react-scroll'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import HomeIcon from '@material-ui/icons/Home'
import ReportIcon from '@material-ui/icons/Report'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    getRouterContext,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    breakpoints,
    compareCurrentBreakpoint as ccb,
    breakpointXS as xs,
    breakpointSM as sm,
    breakpointMD as md,
    getHeaderText,
    lifecycleForPageWithRefs,
    getDomain,
} from '../helpers'

import routerGetters from '../routerGetters'

import {model} from './models'
import {immutableI18nButtonsModel, routerContextModel} from '../models'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import PageTextHelmet from '../../generic/PageTextHelmet'
import VideoList from '../../generic/VideoList'

import headerActions from '../MainHeader/actions'
import actions from './actions'
import appActions from '../actions'
import reportDialogActions from '../ReportDialog/actions'
import {muiStyles} from './assets/muiStyles'

import {
    StyledLink,
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
    renderFavoriteButton = (
        classes,
        data,
        favoriteVideoList,
        addVideoToFavoriteHandler,
        removeVideoFromFavoriteHandler,
        i18nButtons,
    ) => favoriteVideoList.find(id => id === ig(data, 'gallery', 'id'))
        ? <Button
            variant="contained"
            color="primary"
            className={g(classes, 'buttonFavorite')}
            onClick={removeVideoFromFavoriteHandler}
        >
            <Favorite className={g(classes, 'favoriteIcon')}/>
            {ig(i18nButtons, 'removeFromFavorite')}
        </Button>
        : <Button
            variant="contained"
            color="primary"
            className={g(classes, 'buttonFavorite')}
            onClick={addVideoToFavoriteHandler}
        >
            <FavoriteBorder className={g(classes, 'favoriteBorderIcon')}/>
            {ig(i18nButtons, 'addToFavorite')}
        </Button>,

    renderIframe = (src, currentWidth, isVideo) => isVideo === 'isVideo'
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

    renderTag = (classes, x, getTagLink) => <StyledLink to={getTagLink(x)} key={x}>
        <Chip
            label={x}
            className={g(classes, 'chip')}
            component="div"
            variant="outlined"
            color="primary"
            clickable
        />
    </StyledLink>,

    renderProvidedBy = (
        classes,
        i18nLabelProvidedBy,
        sponsorLinkBuilder,
        sponsorName,
        withLabel = false,
    ) => <Typography variant="body1" className={g(classes, 'typographySponsor')}>
        { ! withLabel ? null : `${i18nLabelProvidedBy}: `}
        <SponsorLink to={sponsorLinkBuilder(sponsorName.toLowerCase())}>
            {sponsorName}
        </SponsorLink>
    </Typography>,

    VideoPage = props => <Fragment>
        <PageTextHelmet
            htmlLang={g(props, 'htmlLang')}
            pageText={ig(props.data, 'pageText')}
            openGraphData={ig(props.data, 'openGraphData')}
            routerContext={g(props, 'routerContext')}
            domain={g(props, 'domain')}
        />
        <PageWrapper>
            <PlayerSection>
                <Typography
                    variant="h4"
                    gutterBottom
                    className={g(props, 'classes', 'typographyTitle')}
                >
                    {`${ig(props.data, 'gallery', 'title')} ${
                        ig(props.data, 'pageText', 'galleryTitle')}`}
                </Typography>
                {ccb(g(props, 'cb'), sm) === -1 ? null : renderProvidedBy(
                    g(props, 'classes'),
                    g(props, 'i18nLabelProvidedBy'),
                    g(props, 'sponsorLinkBuilder'),
                    ig(props.data, 'gallery', 'sponsorName'),
                    true,
                )}
                <VideoPlayer ref={g(props, 'setPlayerRef')}>
                    <VideoWrapper>
                        <Video>
                            {(ig(props.data, 'inlineAdvertisementIsShowed') && !g(props, 'isSSR'))
                                ? <InlineAdvertisementWrapper>
                                    <InlineAdvertisement
                                        currentWidth={g(props, 'currentWidth')}
                                    >
                                        <CloseAdvertisement
                                            onClick={g(props, 'closeAdvertisementHandler')}
                                        />
                                        {renderIframe('invideo', g(props, 'currentWidth'))}
                                    </InlineAdvertisement>
                                </InlineAdvertisementWrapper>
                                : null}
                            {renderIframe(
                                ig(props.data, 'gallery', 'urlForIframe'),
                                null,
                                'isVideo'
                            )}
                        </Video>
                        <ControlPanel>
                            <ControlPanelBlock>
                                {g(props, 'isSSR') ? null : renderFavoriteButton(
                                    g(props, 'classes'),
                                    g(props, 'data'),
                                    g(props, 'favoriteVideoList'),
                                    g(props, 'addVideoToFavoriteHandler'),
                                    g(props, 'removeVideoFromFavoriteHandler'),
                                    g(props, 'i18nButtons'),
                                )}
                                <StyledLink to="/">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={g(props, 'classes', 'buttonRoot')}
                                    >
                                        <HomeIcon className={g(props, 'classes', 'homeIcon')}/>
                                        {ig(props.i18nButtons, 'backToMainPage')}
                                    </Button>
                                </StyledLink>
                                { ccb(g(props, 'cb'), xs) === 1 ? null : renderProvidedBy(
                                    g(props, 'classes'),
                                    g(props, 'i18nLabelProvidedBy'),
                                    g(props, 'sponsorLinkBuilder'),
                                    ig(props.data, 'gallery', 'sponsorName'),
                                )}
                            </ControlPanelBlock>
                            <ControlPanelBlock>
                                {g(props, 'isSSR') ? null :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={g(props, 'classes', 'buttonReport')}
                                        onClick={g(props, 'toggleReportDialogHandler')}
                                    >
                                        <ReportIcon
                                            className={g(props, 'classes', 'reportIcon')}
                                        />
                                        {ig(props.i18nButtons, 'report')}
                                    </Button>}
                            </ControlPanelBlock>
                        </ControlPanel>
                    </VideoWrapper>
                    <Advertisement>
                        {renderIframe('sidebar1', g(props, 'currentWidth'))}
                        {renderIframe('sidebar2', g(props, 'currentWidth'))}
                    </Advertisement>
                    <TagsWrapper>
                        { ! ig(props.data, 'gallery', 'tags') ? null :
                            ig(props.data, 'gallery', 'tags').map(x => renderTag(
                                g(props, 'classes'),
                                x,
                                g(props, 'getTagLink')
                            ))}
                    </TagsWrapper>
                </VideoPlayer>
            </PlayerSection>
            <RelatedVideos>
                <Typography
                    variant="h4"
                    gutterBottom
                    className={g(props, 'classes', 'typographyTitle')}
                >
                    {g(props, 'i18nRelatedVideo')}
                </Typography>
                <VideoList
                    videoList={ig(props.data, 'videoList')}
                />
            </RelatedVideos>
            <BottomAdvertisement>
                {renderIframe('bottom1', g(props, 'currentWidth'))}
                {renderIframe('bottom2', g(props, 'currentWidth'))}
                {ccb(g(props, 'cb'), md) === -1 ? null :
                    renderIframe('bottom3', g(props, 'currentWidth'))}
            </BottomAdvertisement>
        </PageWrapper>
    </Fragment>,

    setNewPageFlow = props => {
        if (ig(props.data, 'isLoaded')) {
            props.scrollToPlayer()
            props.setNewText(getHeaderText(ig(props.data, 'pageText'), true, false))
        }
    },

    loadPageFlow = props => {
        const
            pageRequestParams = getPageRequestParams(g(props, 'routerContext'), g(props, 'match'))

        if (doesItHaveToBeReloaded(g(props, 'data'), pageRequestParams))
            props.loadPage(pageRequestParams)
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            data: ig(state, 'app', 'video'),
            routerContext: getRouterContext(state),
            domain: getDomain(state),
            favoriteVideoList: ig(state, 'app', 'ui', 'favoriteVideoList'),
            currentWidth: ig(state, 'app', 'ui', 'currentWidth'),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nRelatedVideo: ig(state, 'app', 'locale', 'i18n', 'headers', 'relatedVideo'),
            i18nLabelProvidedBy: ig(state, 'app', 'locale', 'i18n', 'labels', 'providedBy'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
            closeAdvertisement: g(actions, 'closeAdvertisement'),
            addVideoToFavorite: g(appActions, 'addVideoToFavorite'),
            removeVideoFromFavorite: g(appActions, 'removeVideoFromFavorite'),
            toggleReportDialogFlow: g(reportDialogActions, 'toggleReportDialogFlow'),
        }
    ),
    withState('playerRef', 'setPlayerRef', null),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
        closeAdvertisementHandler: props => () => props.closeAdvertisement(),
        addVideoToFavoriteHandler: props => event => {
            event.preventDefault()
            props.addVideoToFavorite(ig(props.data, 'gallery').deleteAll(
                ['published', 'classId', 'sponsorUrl', 'urlForIframe', 'tags']
            ))
        },
        removeVideoFromFavoriteHandler: props => event => {
            event.preventDefault()
            props.removeVideoFromFavorite(ig(props.data, 'gallery', 'id'))
        },
        toggleReportDialogHandler: props => () => {
            props.toggleReportDialogFlow()
        },
        getTagLink: props => searchQuery => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            {searchQuery},
            ['searchQuery'],
        ),
        sponsorLinkBuilder: props => sponsor =>
            routerGetters.site.link(g(props, 'routerContext'), sponsor, null),
        scrollToPlayer: props => () => {
            animateScroll.scrollTo(g(props, 'playerRef', 'offsetTop'), {
                duration: 500,
                delay: 500,
                smooth: true,
            })
        }
    }),
    lifecycleForPageWithRefs(loadPageFlow, setNewPageFlow, ['playerRef']),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            typographyTitle: PropTypes.string,
            typographySponsor: PropTypes.string,
            buttonRoot: PropTypes.string,
            buttonFavorite: PropTypes.string,
            buttonReport: PropTypes.string,
            favoriteBorderIcon: PropTypes.string,
            favoriteIcon: PropTypes.string,
            reportIcon: PropTypes.string,
            homeIcon: PropTypes.string,
            chip: PropTypes.string,
        }),

        cb: PropTypes.oneOf(breakpoints),
        isSSR: PropTypes.bool,
        data: model,
        routerContext: routerContextModel,
        domain: PropTypes.string,
        favoriteVideoList: ImmutablePropTypes.listOf(PropTypes.number),
        currentWidth: PropTypes.number,
        htmlLang: PropTypes.string,
        i18nButtons: immutableI18nButtonsModel,
        i18nRelatedVideo: PropTypes.string,
        i18nLabelProvidedBy: PropTypes.string,

        playerRef: PropTypes.nullable(PropTypes.instanceOf(
            typeof Element === 'undefined' ? () => {} : Element // plug for SSR
        )),

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        closeAdvertisement: PropTypes.func,
        closeAdvertisementHandler: PropTypes.func,
        addVideoToFavorite: PropTypes.func,
        addVideoToFavoriteHandler: PropTypes.func,
        removeVideoFromFavorite: PropTypes.func,
        removeVideoFromFavoriteHandler: PropTypes.func,
        getTagLink: PropTypes.func,
        sponsorLinkBuilder: PropTypes.func,
        scrollToPlayer: PropTypes.func,
        toggleReportDialogFlow: PropTypes.func,
        toggleReportDialogHandler: PropTypes.func,
    }),
    loadingWrapper({
        withPlayer: true,
        withMoviesList: true,
    })
)(VideoPage)
