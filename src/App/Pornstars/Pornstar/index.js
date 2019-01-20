import {get} from 'lodash'
import React from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps} from 'recompose'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record, Map, List} from 'immutable'

import {
    getHeaderText,
    localizedGetSubPage,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
} from '../../helpers'

import {
    orientationCodes,
    routerContextModel,
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
} from '../../models'

import {dataModel} from './models'
import {routerGetters} from '../../../router-builder'
import sectionPortal from '../../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../../MainHeader/Niche/orientationPortal'
import ControlBar from '../../../generic/ControlBar'
import ErrorContent from '../../../generic/ErrorContent'
import Lists from '../../../generic/Lists'
import VideoList from '../../../generic/VideoList'

import Info from './Info'
import {Page, Content, PageWrapper} from './assets'
import headerActions from '../../MainHeader/actions'
import actions from './actions'

const
    Pornstar = ({
        currentBreakpoint, i18nOrdering, i18nButtons, data, chooseSort,
        isSSR, modelInfoHandler, modelInfoIsOpen,
        controlLinkBuilder, modelLinkBuilder,
    }) => <Page>
        { ig(data, 'isFailed')
            ? <ErrorContent/>
            : ig(data, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    currentBreakpoint={currentBreakpoint}
                    modelsList={ig(data, 'modelsList')}
                    modelLinkBuilder={modelLinkBuilder}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {data.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <Info
                        modelThumb={ig(data, 'modelThumb')}
                        modelInfo={ig(data, 'modelInfo')}
                        modelInfoHandler={modelInfoHandler}
                        modelInfoIsOpen={modelInfoIsOpen}
                        currentBreakpoint={currentBreakpoint}
                        isSSR={isSSR}
                    />
                    <ControlBar
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={ig(data, 'pagesCount')}
                        pageNumber={ig(data, 'pageNumber')}
                        itemsCount={ig(data, 'itemsCount')}
                        sortList={ig(data, 'sortList')}
                        currentSort={ig(data, 'currentSort')}
                        archiveFilms={null}
                        tagArchiveListOlder={null}
                        tagArchiveListNewer={null}
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={null}
                    />
                    <VideoList
                        videoList={ig(data, 'videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    DataRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        modelInfoIsOpen: false,

        lastOrientationCode: '',
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,
        sortList: List(),
        currentSort: null,
        itemsCount: 0,
        videoList: List(),
        modelsList: List(),
        modelInfo: List(),
        modelThumb: '',
    }),

    loadPageFlow = ({
        search, routerContext, pornstarCode, data,
        loadPage, setHeaderText, currentOrientation,
    }) => {
        const
            qs = queryString.parse(search),
            ordering = get(qs, [ig(routerContext, 'router', 'ordering', 'qsKey')], null),
            pagination = get(qs, [ig(routerContext, 'router', 'pagination', 'qsKey')], null),
            getSubPage = localizedGetSubPage(routerContext),
            subPageForRequest = getSubPage(pornstarCode, ordering, pagination)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            ig(data, 'isLoading') ||
            (
                (ig(data, 'isLoaded') || ig(data, 'isFailed')) &&
                subPageForRequest === ig(data, 'lastSubPageForRequest') &&
                g(currentOrientation, []) === ig(data, 'lastOrientationCode')
            )
        ))
            loadPage(subPageForRequest)
        else if (ig(data, 'isLoaded'))
            setHeaderText(getHeaderText(data, true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: DataRecord(ig(state, 'app', 'pornstars', 'pornstar')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            search: ig(state, 'router', 'location', 'search'),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            modelInfoIsOpen: ig(state, 'app', 'pornstars', 'pornstar', 'modelInfoIsOpen'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            toggleModelInfo: g(actions, 'toggleModelInfo'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withProps(props => ({
        pornstarCode: g(props, 'match', 'params', 'child'),
    })),
    withHandlers({
        loadPage: props => subPageForRequest => props.loadPageRequest({
            orientationCode: g(props, 'currentOrientation'),
            subPageForRequest,
        }),

        setHeaderText: props => headerText => props.setNewText(headerText),

        modelInfoHandler: props => state => props.toggleModelInfo(state),

        chooseSort: props => newSortValue => props.setNewSort({
            newSortValue,
            pornstarCode: g(props, 'pornstarCode'),
        }),

        controlLinkBuilder: props => qsParams => routerGetters.pornstar.link(
            g(props, 'routerContext'),
            g(props, 'pornstarCode'),
            qsParams
        ),

        modelLinkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), child, null),
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
        currentOrientation: PropTypes.oneOf(orientationCodes),
        currentBreakpoint: PropTypes.string,
        data: dataModel,
        isSSR: PropTypes.bool,
        search: PropTypes.string,
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        modelInfoIsOpen: PropTypes.bool,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        toggleModelInfo: PropTypes.func,
        modelInfoHandler: PropTypes.func,
        setNewText: PropTypes.func,
        setHeaderText: PropTypes.func,
        setNewSort: PropTypes.func,
        chooseSort: PropTypes.func,
        controlLinkBuilder: PropTypes.func,
        modelLinkBuilder: PropTypes.func,
    }),
)(Pornstar)
