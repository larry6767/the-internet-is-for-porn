// TODO: this page needs propTypes
import {get} from 'lodash'
import React from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps, setPropTypes} from 'recompose'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record, Map, List, fromJS} from 'immutable'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    getSubPage,
    getRouterContext,
} from '../../helpers'

import {
    immutableI18nButtonsModel,
    routerContextModel
} from '../../models'

import {routerGetters} from '../../../router-builder'
import ControlBar from '../../../generic/ControlBar'
import ErrorContent from '../../../generic/ErrorContent'
import Lists from '../../../generic/Lists'
import VideoList from '../../../generic/VideoList'
import {Page, Content, PageWrapper} from './assets'
import actions from './actions'

const
    NicheRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        currentPage: '',
        currentSubPage: '',
        lastSubPageForRequest: '',

        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,

        tagList: List(),
        tagArchiveList: List(),
        sortList: List(),
        currentSort: null,
        archiveFilms: Map(),
        tagArchiveListOlder: fromJS(),
        tagArchiveListNewer: fromJS(),
        itemsCount: 0,
        videoList: List(),
    }),

    Niche = ({
        currentBreakpoint,
        pageUrl,
        i18nOrdering,
        i18nButtons,
        niche,
        chooseSort,
        isSSR,
        controlLinkBuilder,
        controlArchiveLinkBuilder,
        controlBackFromArchiveLinkBuilder,
    }) => <Page>
        { niche.get('isFailed')
            ? <ErrorContent/>
            : niche.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    currentBreakpoint={currentBreakpoint}
                    pageUrl={pageUrl}
                    tagList={niche.get('tagList')}
                    tagArchiveList={niche.get('tagArchiveList')}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {niche.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={controlArchiveLinkBuilder}
                        backFromArchiveLinkBuilder={controlBackFromArchiveLinkBuilder}
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={niche.get('pagesCount')}
                        pageNumber={niche.get('pageNumber')}
                        itemsCount={niche.get('itemsCount')}
                        sortList={niche.get('sortList')}
                        currentSort={niche.get('currentSort')}
                        archiveFilms={niche.get('archiveFilms')}
                        tagArchiveListOlder={niche.get('tagArchiveListOlder')}
                        tagArchiveListNewer={niche.get('tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={niche.get('videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({search, routerContext, nicheCode, archiveParams, niche, loadPage}) => {
        const
            qs = queryString.parse(search),

            // TODO backward mapping to "eng" values for ordering
            ordering = get(qs, [ig(routerContext, 'router', 'ordering', 'qsKey')], null),

            pagination = get(qs, [ig(routerContext, 'router', 'pagination', 'qsKey')], null),

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
                subPageForRequest === ig(niche, 'lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
    }

export default compose(
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            niche: NicheRecord(ig(state, 'app', 'niches', 'niche')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
            search: ig(state, 'router', 'location', 'search'),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
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
        loadPage: props => subPageForRequest => props.loadPageRequest(subPageForRequest),

        chooseSort: props => newSortValue => props.setNewSort({
            newSortValue,
            nicheCode: g(props, 'nicheCode'),
            archiveParams: g(props, 'archiveParams'),
        }),

        controlLinkBuilder: props => qsParams =>
            g(props, 'archiveParams') === null
            ? routerGetters.niche.link(g(props, 'routerContext'), g(props, 'nicheCode'), qsParams)
            : routerGetters.nicheArchive.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                g(props, 'archiveParams', 'year'),
                g(props, 'archiveParams', 'month'),
                qsParams
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
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    setPropTypes({
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,
    }),
)(Niche)
