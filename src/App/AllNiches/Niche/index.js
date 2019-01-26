// TODO: this page needs propTypes
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps} from 'recompose'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record} from 'immutable'

import {
    getHeaderText,
    plainProvedGet as g,
    immutableProvedGet as ig,
    getRouterContext,
    setPropTypes,
    PropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
} from '../../helpers'

import {
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    routerContextModel,
} from '../../models'

import {dataModel} from './models'
import {routerGetters} from '../../../router-builder'
import orientationPortal from '../../MainHeader/Niche/orientationPortal'
import sectionPortal from '../../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../../generic/ControlBar'
import ErrorContent from '../../../generic/ErrorContent'
import PageTextHelmet from '../../../generic/PageTextHelmet'
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
        data,
        chooseSort,
        isSSR,
        controlLinkBuilder,
        controlArchiveLinkBuilder,
        controlBackFromArchiveLinkBuilder,
        listsTagLinkBuilder,
        listsArchiveLinkBuilder,
    }) => <Page>
        { ig(data, 'isFailed')
            ? <ErrorContent/>
            : ig(data, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageTextHelmet pageText={ig(data, 'pageText')}/>
                <Lists
                    currentBreakpoint={currentBreakpoint}

                    tagList={ig(data, 'tagList')}
                    tagLinkBuilder={listsTagLinkBuilder}

                    tagArchiveList={ig(data, 'tagArchiveList')}
                    archiveLinkBuilder={listsArchiveLinkBuilder}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {ig(data, 'pageText', 'listHeader')}
                    </Typography>
                    <ControlBar
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={controlArchiveLinkBuilder}
                        backFromArchiveLinkBuilder={controlBackFromArchiveLinkBuilder}
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}
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
                </PageWrapper>
            </Content>
        }
    </Page>,

    DataRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        currentPage: null,
        currentSubPage: null,
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

    loadPageFlow = ({data, loadPage, setHeaderText, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(data, pageRequestParams))
            loadPage(pageRequestParams)
        else if (ig(data, 'isLoaded'))
            setHeaderText(getHeaderText(g(data, []), true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: DataRecord(ig(state, 'app', 'niches', 'niche')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
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
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
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
        currentBreakpoint: PropTypes.string,
        data: dataModel,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        setHeaderText: PropTypes.func,
        setNewSort: PropTypes.func,
        chooseSort: PropTypes.func,
        controlLinkBuilder: PropTypes.func,
        controlArchiveLinkBuilder: PropTypes.func,
        controlBackFromArchiveLinkBuilder: PropTypes.func,
        listsTagLinkBuilder: PropTypes.func,
        listsArchiveLinkBuilder: PropTypes.func,
    }),
)(Niche)
