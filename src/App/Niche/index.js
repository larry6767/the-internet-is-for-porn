// TODO: this page needs propTypes
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, withHandlers, withProps, withState, lifecycle} from 'recompose'
import Typography from '@material-ui/core/Typography'

import {
    getHeaderWithOrientation,
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
    getRouterContext,
    setPropTypes,
    PropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    breakpoints,
} from '../helpers'

import {
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    routerContextModel,
} from '../models'

import {model} from './models'
import routerGetters from '../routerGetters'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import ControlBar from '../../generic/ControlBar'
import PageTextHelmet from '../../generic/PageTextHelmet'
import Lists from '../../generic/Lists'
import VideoList from '../../generic/VideoList'
import {PageWrapperNextToList} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'

const
    Niche = ({
        cb,
        i18nOrdering,
        i18nButtons,
        data,
        chooseSort,
        isSSR,
        controlLinkBuilder,
        controlArchiveLinkBuilder,
        controlBackFromArchiveLinkBuilder,
        listsTagLinkBuilder,
        listsArchiveLinkBuilder,
        sponsorLinkBuilder,
        i18nListNichesHeader,
        i18nListArchiveHeader,
        i18nLabelShowing,
        setPageWrapperRef,
        pageWrapperRef,

    }) => <Fragment>
        <PageTextHelmet pageText={ig(data, 'pageText')}/>
        {!pageWrapperRef && !isSSR ? null : <Lists
            cb={cb}
            maxHeight={!isSSR ? g(pageWrapperRef, 'clientHeight') : null}
            sponsorsList={ig(data, 'sponsorsList')}
            sponsorLinkBuilder={sponsorLinkBuilder}
            tagList={ig(data, 'tagList')}
            tagLinkBuilder={listsTagLinkBuilder}
            tagArchiveList={ig(data, 'tagArchiveList')}
            archiveLinkBuilder={listsArchiveLinkBuilder}
            i18nListNichesHeader={i18nListNichesHeader}
            i18nListArchiveHeader={i18nListArchiveHeader}
        />}
        <PageWrapperNextToList ref={setPageWrapperRef}>
            <Typography variant="h4" gutterBottom>
                {ig(data, 'pageText', 'listHeader')}
            </Typography>
            <ControlBar
                cb={cb}
                linkBuilder={controlLinkBuilder}
                archiveLinkBuilder={controlArchiveLinkBuilder}
                backFromArchiveLinkBuilder={controlBackFromArchiveLinkBuilder}
                i18nOrdering={i18nOrdering}
                i18nButtons={i18nButtons}
                i18nLabelShowing={i18nLabelShowing}
                chooseSort={chooseSort}
                isSSR={isSSR}
                pagesCount={ig(data, 'pagesCount')}
                pageNumber={ig(data, 'pageNumber')}
                itemsCount={ig(data, 'itemsCount')}
                sortList={ig(data, 'sortList')}
                currentSort={ig(data, 'currentSort')}
                archiveFilms={ig(data, 'archiveFilms')}
                tagArchiveListOlder={ig(data, 'tagArchiveListOlder')}
                tagArchiveListNewer={ig(data, 'tagArchiveListNewer')}
            />
            <VideoList
                videoList={ig(data, 'videoList')}
            />
        </PageWrapperNextToList>
    </Fragment>,

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps))
            nextProps.setNewText(getHeaderText(g(nextProps, 'data'), true))
    },

    loadPageFlow = ({data, loadPage, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(data, pageRequestParams))
            loadPage(pageRequestParams)
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: ig(state, 'app', 'niche'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nListNichesHeader: getHeaderWithOrientation(state, 'listNiches'),
            i18nListArchiveHeader: ig(state, 'app', 'locale', 'i18n', 'headers', 'listArchive'),
            i18nLabelShowing: ig(state, 'app', 'locale', 'i18n', 'labels', 'showing'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withState('pageWrapperRef', 'setPageWrapperRef', null),
    withProps(props => ({
        nicheCode: g(props, 'match', 'params', 'child'),
        archiveParams:
            !(props.match.params[0] && props.match.params[1]) ? null : {
                year: g(props, 'match', 'params', 0),
                month: g(props, 'match', 'params', 1),
            },
    })),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        chooseSort: props => event => {
            event.preventDefault()
            props.setNewSort({
                newSortValue: event.target.value,
                nicheCode: g(props, 'nicheCode'),
                archiveParams: g(props, 'archiveParams'),
            })
        },

        controlLinkBuilder: props => qsParams =>
            g(props, 'archiveParams') === null
            ? routerGetters.niche.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                qsParams,
                ['ordering', 'pagination']
            )
            : routerGetters.nicheArchive.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                g(props, 'archiveParams', 'year'),
                g(props, 'archiveParams', 'month'),
                qsParams,
                ['pagination']
            ),

        controlArchiveLinkBuilder: props => (year, month) =>
            routerGetters.nicheArchive.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                year,
                month,
                null
            ),

        controlBackFromArchiveLinkBuilder: props => () =>
            routerGetters.niche.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                null
            ),

        listsTagLinkBuilder: props => child =>
            routerGetters.niche.link(g(props, 'routerContext'), child, null),

        listsArchiveLinkBuilder: props => (year, month) =>
            routerGetters.nicheArchive.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                year,
                month,
                null
            ),

        sponsorLinkBuilder: props => sponsor =>
            routerGetters.site.link(g(props, 'routerContext'), sponsor, null)
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
            setNewPageFlow(null, this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
            setNewPageFlow(this.props, nextProps)
        },
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        cb: PropTypes.oneOf(breakpoints),
        data: model,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        i18nListNichesHeader: PropTypes.string,
        i18nListArchiveHeader: PropTypes.string,
        i18nLabelShowing: PropTypes.string,
        pageWrapperRef: PropTypes.nullable(PropTypes.instanceOf(
            typeof Element === 'undefined' ? () => {} : Element // plug for SSR
        )),

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        setNewSort: PropTypes.func,
        chooseSort: PropTypes.func,
        controlLinkBuilder: PropTypes.func,
        controlArchiveLinkBuilder: PropTypes.func,
        controlBackFromArchiveLinkBuilder: PropTypes.func,
        listsTagLinkBuilder: PropTypes.func,
        listsArchiveLinkBuilder: PropTypes.func,
        sponsorLinkBuilder: PropTypes.func,
        setPageWrapperRef: PropTypes.func,
    }),
    loadingWrapper({
        withLists: true,
        withControlBar: true,
        withMoviesList: true,
    })
)(Niche)
