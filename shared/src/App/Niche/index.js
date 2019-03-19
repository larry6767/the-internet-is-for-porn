import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, withHandlers, withProps, withState, lifecycle} from 'recompose'
import Typography from '@material-ui/core/Typography'

// local libs
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
} from 'src/App/helpers'

import {routerContextModel, refModel} from 'src/App/models'
import {model} from 'src/App/Niche/models'
import routerGetters from 'src/App/routerGetters'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import ControlBar from 'src/generic/ControlBar'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import Lists from 'src/generic/Lists'
import VideoList from 'src/generic/VideoList'
import {PageWrapperNextToList} from 'src/App/Niche/assets'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/Niche/actions'

const
    Niche = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        {!g(props, 'pageWrapperRef') && !g(props, 'isSSR') ? null : <Lists
            cb={g(props, 'cb')}
            maxHeight={!g(props, 'isSSR') ? g(props, 'pageWrapperRef', 'clientHeight') : null}
            sponsorsList={ig(props.data, 'sponsorsList')}
            sponsorLinkBuilder={g(props, 'sponsorLinkBuilder')}
            tagList={ig(props.data, 'tagList')}
            tagLinkBuilder={g(props, 'listsTagLinkBuilder')}
            tagArchiveList={ig(props.data, 'tagArchiveList')}
            archiveLinkBuilder={g(props, 'listsArchiveLinkBuilder')}
            i18nListNichesHeader={g(props, 'i18nListNichesHeader')}
            i18nListArchiveHeader={g(props, 'i18nListArchiveHeader')}
        />}
        <PageWrapperNextToList ref={g(props, 'setPageWrapperRef')}>
            <Typography variant="h4" gutterBottom>
                {ig(props.data, 'pageText', 'listHeader')}
            </Typography>
            <ControlBar
                linkBuilder={g(props, 'controlLinkBuilder')}
                archiveLinkBuilder={g(props, 'controlArchiveLinkBuilder')}
                backFromArchiveLinkBuilder={g(props, 'controlBackFromArchiveLinkBuilder')}
                chooseSort={g(props, 'chooseSort')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                sortList={ig(props.data, 'sortList')}
                currentSort={ig(props.data, 'currentSort')}
                archiveFilms={ig(props.data, 'archiveFilms')}
                tagArchiveListOlder={ig(props.data, 'tagArchiveListOlder')}
                tagArchiveListNewer={ig(props.data, 'tagArchiveListNewer')}
            />
            <VideoList videoList={ig(props.data, 'videoList')}/>
            {g(ig(props.data, 'videoList'), 'size') < 20 ? null : <ControlBar
                isDownBelow={true}
                linkBuilder={g(props, 'controlLinkBuilder')}
                archiveLinkBuilder={g(props, 'controlArchiveLinkBuilder')}
                backFromArchiveLinkBuilder={g(props, 'controlBackFromArchiveLinkBuilder')}
                chooseSort={g(props, 'chooseSort')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                sortList={ig(props.data, 'sortList')}
                currentSort={ig(props.data, 'currentSort')}
                archiveFilms={ig(props.data, 'archiveFilms')}
                tagArchiveListOlder={ig(props.data, 'tagArchiveListOlder')}
                tagArchiveListNewer={ig(props.data, 'tagArchiveListNewer')}
            />}
        </PageWrapperNextToList>
    </Fragment>,

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps))
            nextProps.setNewText(getHeaderText(ig(nextProps.data, 'pageText'), true))
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
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nListNichesHeader: getHeaderWithOrientation(state, 'listNiches'),
            i18nListArchiveHeader: ig(state, 'app', 'locale', 'i18n', 'headers', 'listArchive'),
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
        htmlLang: PropTypes.string,
        i18nListNichesHeader: PropTypes.string,
        i18nListArchiveHeader: PropTypes.string,
        pageWrapperRef: refModel,
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
