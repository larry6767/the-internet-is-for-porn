// TODO: this page needs propTypes
import {get} from 'lodash'
import React from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps} from 'recompose'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record, List} from 'immutable'

import {
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
    localizedGetSubPage,
    getRouterContext,
    setPropTypes,
    PropTypes,
} from '../../helpers'

import {
    immutableI18nButtonsModel,
    routerContextModel,
    orientationCodes,
    PageTextRecord,
} from '../../models'

import {routerGetters} from '../../../router-builder'
import orientationPortal from '../../MainHeader/Niche/orientationPortal'
import sectionPortal from '../../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../../generic/ControlBar'
import ErrorContent from '../../../generic/ErrorContent'
import Head from '../../../generic/Head'
import Lists from '../../../generic/Lists'
import VideoList from '../../../generic/VideoList'
import {Page, Content, PageWrapper} from './assets'
import headerActions from '../../MainHeader/actions'
import actions from './actions'

const
    Niche = ({
        currentBreakpoint,
        i18nOrdering,
        i18nButtons,
        niche,
        chooseSort,
        isSSR,
        controlLinkBuilder,
        controlArchiveLinkBuilder,
        controlBackFromArchiveLinkBuilder,
        listsTagLinkBuilder,
        listsArchiveLinkBuilder,
    }) => <Page>
        { ig(niche, 'isFailed')
            ? <ErrorContent/>
            : ig(niche, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <Head
                    title={ig(niche, 'pageText', 'title')}
                    description={ig(niche, 'pageText', 'description')}
                    keywords={ig(niche, 'pageText', 'keywords')}
                />
                <Lists
                    currentBreakpoint={currentBreakpoint}

                    tagList={ig(niche, 'tagList')}
                    tagLinkBuilder={listsTagLinkBuilder}

                    tagArchiveList={ig(niche, 'tagArchiveList')}
                    archiveLinkBuilder={listsArchiveLinkBuilder}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {ig(niche, 'pageText', 'listHeader')}
                    </Typography>
                    <ControlBar
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={controlArchiveLinkBuilder}
                        backFromArchiveLinkBuilder={controlBackFromArchiveLinkBuilder}
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={ig(niche, 'pagesCount')}
                        pageNumber={ig(niche, 'pageNumber')}
                        itemsCount={ig(niche, 'itemsCount')}
                        sortList={ig(niche, 'sortList')}
                        currentSort={ig(niche, 'currentSort')}
                        archiveFilms={ig(niche, 'archiveFilms')}
                        tagArchiveListOlder={ig(niche, 'tagArchiveListOlder')}
                        tagArchiveListNewer={ig(niche, 'tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={ig(niche, 'videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    NicheRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        currentPage: '',
        currentSubPage: '',
        lastSubPageForRequest: '',
        lastOrientationCode: '',

        pageNumber: 1,
        pageText: PageTextRecord(),
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

    loadPageFlow = ({
        search, routerContext, nicheCode, archiveParams, niche,
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
                ? getSubPage(nicheCode, ordering, pagination, archive)
                : getSubPage(nicheCode, ordering, pagination)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            ig(niche, 'isLoading') ||
            (
                (ig(niche, 'isLoaded') || ig(niche, 'isFailed')) &&
                g(currentOrientation, []) === ig(niche, 'lastOrientationCode') &&
                subPageForRequest === ig(niche, 'lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
        else if (ig(niche, 'isLoaded'))
            setHeaderText(getHeaderText(g(niche, []), true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            niche: NicheRecord(ig(state, 'app', 'niches', 'niche')),
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
        nicheCode: g(props, 'match', 'params', 'child'),
        archiveParams:
            !(props.match.params[0] && props.match.params[1]) ? null : {
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
            nicheCode: g(props, 'nicheCode'),
            archiveParams: g(props, 'archiveParams'),
        }),

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
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,
        currentOrientation: PropTypes.oneOf(orientationCodes),
    }),
)(Niche)
