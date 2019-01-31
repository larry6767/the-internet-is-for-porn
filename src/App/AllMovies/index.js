// TODO: this page needs propTypes
import React from 'react'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'

import {
    getHeaderWithOrientation,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    getHeaderText,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
} from '../helpers'

import {immutableI18nButtonsModel} from '../models'
import {routerGetters} from '../../router-builder'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import PageTextHelmet from '../../generic/PageTextHelmet'
import Lists from '../../generic/Lists'
import VideoList from '../../generic/VideoList'
import {Page, Content, AllMoviesPageWrapper} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    DataRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        currentPage: null,
        lastPageRequestParams: null,

        pageNumber: null,
        pageText: null,
        pagesCount: null,

        tagList: null,
        tagArchiveList: null,
        sortList: null,
        currentSort: null,
        archiveFilms: null,
        tagArchiveListOlder: null,
        tagArchiveListNewer: null,
        itemsCount: null,
        videoList: null,
    }),

    AllMovies = ({
        classes,
        currentBreakpoint,
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
        i18nListNichesHeader,
        i18nListArchiveHeader,
        i18nLabelShowing,
    }) => <Page>
        { data.get('isFailed')
            ? <ErrorContent/>
            : data.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageTextHelmet pageText={ig(data, 'pageText')}/>
                <Lists
                    currentBreakpoint={currentBreakpoint}

                    tagList={data.get('tagList')}
                    tagLinkBuilder={listsTagLinkBuilder}

                    tagArchiveList={data.get('tagArchiveList')}
                    archiveLinkBuilder={listsArchiveLinkBuilder}

                    i18nListNichesHeader={i18nListNichesHeader}
                    i18nListArchiveHeader={i18nListArchiveHeader}
                />
                <AllMoviesPageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {data.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        cb={currentBreakpoint}
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={controlArchiveLinkBuilder}
                        backFromArchiveLinkBuilder={controlBackFromArchiveLinkBuilder}
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}
                        i18nLabelShowing={i18nLabelShowing}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={data.get('pagesCount')}
                        pageNumber={data.get('pageNumber')}
                        itemsCount={data.get('itemsCount')}
                        sortList={data.get('sortList')}
                        currentSort={data.get('currentSort')}
                        archiveFilms={data.get('archiveFilms')}
                        tagArchiveListOlder={data.get('tagArchiveListOlder')}
                        tagArchiveListNewer={data.get('tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={data.get('videoList')}
                    />
                </AllMoviesPageWrapper>
            </Content>
        }
    </Page>,

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
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: DataRecord(ig(state, 'app', 'allMovies')),
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
    withProps(props => ({
        archiveParams: !(props.match.params[0] && props.match.params[1]) ? null : {
            year: Number(g(props, 'match', 'params', 0)),
            month: Number(g(props, 'match', 'params', 1)),
        },
    })),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        chooseSort: props => newSortValue => props.setNewSort({
            newSortValue,
            archiveParams: g(props, 'archiveParams'),
        }),

        controlLinkBuilder: props => qsParams =>
            g(props, 'archiveParams') === null
            ? routerGetters.allMovies.link(
                g(props, 'routerContext'),
                qsParams,
                ['ordering', 'pagination']
            )
            : routerGetters.allMoviesArchive.link(
                g(props, 'routerContext'),
                g(props, 'archiveParams', 'year'),
                g(props, 'archiveParams', 'month'),
                qsParams,
                ['pagination']
            ),

        controlArchiveLinkBuilder: props => (year, month) =>
            routerGetters.allMoviesArchive.link(g(props, 'routerContext'), year, month, null),

        controlBackFromArchiveLinkBuilder: props => () =>
            routerGetters.allMovies.link(g(props, 'routerContext'), null),

        listsTagLinkBuilder: props => child =>
            routerGetters.niche.link(g(props, 'routerContext'), child, null),

        listsArchiveLinkBuilder: props => (year, month) =>
            routerGetters.allMoviesArchive.link(
                g(props, 'routerContext'),
                year,
                month,
                null
            ),
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
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        i18nButtons: immutableI18nButtonsModel,
    }),
)(AllMovies)
