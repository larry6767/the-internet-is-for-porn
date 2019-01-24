// TODO: this page needs propTypes
import {get} from 'lodash'
import React from 'react'
import {Record, List} from 'immutable'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'

import {
    localizedGetSubPage,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
    getHeaderText,
} from '../helpers'

import {immutableI18nButtonsModel, orientationCodes, PageTextRecord} from '../models'
import {routerGetters} from '../../router-builder'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import Head from '../../generic/Head'
import Lists from '../../generic/Lists'
import VideoList from '../../generic/VideoList'
import {Page, Content, AllMoviesPageWrapper} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    AllMoviesRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        currentPage: '',
        lastSubPageForRequest: '',
        lastOrientationCode: '',

        pageNumber: 1,
        pageText: PageTextRecord,
        pagesCount: 1,

        tagList: List(),
        tagArchiveList: List(),
        sortList: List(),
        currentSort: null,
        archiveFilms: null,
        tagArchiveListOlder: null,
        tagArchiveListNewer: null,
        itemsCount: 0,
        videoList: List(),
    }),

    AllMovies = ({
        classes,
        currentBreakpoint,
        i18nOrdering,
        i18nButtons,
        allMovies,
        chooseSort,
        isSSR,
        controlLinkBuilder,
        controlArchiveLinkBuilder,
        controlBackFromArchiveLinkBuilder,
        listsTagLinkBuilder,
        listsArchiveLinkBuilder,
    }) => <Page>
        { allMovies.get('isFailed')
            ? <ErrorContent/>
            : allMovies.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <Head
                    title={g(allMovies, 'pageText', 'title')}
                    description={g(allMovies, 'pageText', 'description')}
                    keywords={g(allMovies, 'pageText', 'keywords')}
                />
                <Lists
                    currentBreakpoint={currentBreakpoint}

                    tagList={allMovies.get('tagList')}
                    tagLinkBuilder={listsTagLinkBuilder}

                    tagArchiveList={allMovies.get('tagArchiveList')}
                    archiveLinkBuilder={listsArchiveLinkBuilder}
                />
                <AllMoviesPageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {allMovies.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={controlArchiveLinkBuilder}
                        backFromArchiveLinkBuilder={controlBackFromArchiveLinkBuilder}
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={allMovies.get('pagesCount')}
                        pageNumber={allMovies.get('pageNumber')}
                        itemsCount={allMovies.get('itemsCount')}
                        sortList={allMovies.get('sortList')}
                        currentSort={allMovies.get('currentSort')}
                        archiveFilms={allMovies.get('archiveFilms')}
                        tagArchiveListOlder={allMovies.get('tagArchiveListOlder')}
                        tagArchiveListNewer={allMovies.get('tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={allMovies.get('videoList')}
                    />
                </AllMoviesPageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({
        search, routerContext, allMovies, archiveParams,
        loadPage, setHeaderText, currentOrientation,
    }) => {
        const
            qs = queryString.parse(search),
            ordering = get(qs, [ig(routerContext, 'router', 'ordering', 'qsKey')], null),
            pagination = get(qs, [ig(routerContext, 'router', 'pagination', 'qsKey')], null),
            getSubPage = localizedGetSubPage(routerContext),

            archive =
                archiveParams === null ? null :
                [g(archiveParams, 'year'), g(archiveParams, 'month')],

            subPageForRequest =
                archive !== null
                ? getSubPage(null, ordering, pagination, archive)
                : getSubPage(null, ordering, pagination)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            ig(allMovies, 'isLoading') ||
            (
                (ig(allMovies, 'isLoaded') || ig(allMovies, 'isFailed')) &&
                g(currentOrientation, []) === ig(allMovies, 'lastOrientationCode') &&
                subPageForRequest === ig(allMovies, 'lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
        else if (ig(allMovies, 'isLoaded'))
            setHeaderText(getHeaderText(g(allMovies, []), true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            allMovies: AllMoviesRecord(ig(state, 'app', 'allMovies')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            search: ig(state, 'router', 'location', 'search'),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withProps(props => ({
        archiveParams: !(props.match.params[0] && props.match.params[1]) ? null : {
            year: g(props, 'match', 'params', 0),
            month: g(props, 'match', 'params', 1),
        },
    })),
    withHandlers({
        loadPage: props => subPageForRequest => props.loadPageRequest({
            orientationCode: g(props, 'currentOrientation'),
            subPageForRequest,
        }),

        setHeaderText: props => headerText => props.setNewText(headerText),

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
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        i18nButtons: immutableI18nButtonsModel,
        currentOrientation: PropTypes.oneOf(orientationCodes),
    }),
)(AllMovies)
