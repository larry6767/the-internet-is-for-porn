// TODO: this page needs propTypes
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
    immutableProvedGet as ig
} from '../../helpers'

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
    PornstarRecord = Record({
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

    Pornstar = ({
        currentBreakpoint, i18nOrdering, i18nButtons, pornstar, chooseSort,
        isSSR, modelInfoHandler, modelInfoIsOpen,
        controlLinkBuilder, modelLinkBuilder,
    }) => <Page>
        { ig(pornstar, 'isFailed')
            ? <ErrorContent/>
            : ig(pornstar, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    currentBreakpoint={currentBreakpoint}
                    modelsList={ig(pornstar, 'modelsList')}
                    modelLinkBuilder={modelLinkBuilder}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {pornstar.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <Info
                        modelThumb={ig(pornstar, 'modelThumb')}
                        modelInfo={ig(pornstar, 'modelInfo')}
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
                        pagesCount={ig(pornstar, 'pagesCount')}
                        pageNumber={ig(pornstar, 'pageNumber')}
                        itemsCount={ig(pornstar, 'itemsCount')}
                        sortList={ig(pornstar, 'sortList')}
                        currentSort={ig(pornstar, 'currentSort')}
                        archiveFilms={null}
                        tagArchiveListOlder={null}
                        tagArchiveListNewer={null}
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={null}
                    />
                    <VideoList
                        videoList={ig(pornstar, 'videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({
        search, routerContext, pornstarCode, pornstar,
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
            ig(pornstar, 'isLoading') ||
            (
                (ig(pornstar, 'isLoaded') || ig(pornstar, 'isFailed')) &&
                subPageForRequest === ig(pornstar, 'lastSubPageForRequest') &&
                g(currentOrientation, []) === ig(pornstar, 'lastOrientationCode')
            )
        ))
            loadPage(subPageForRequest)
        else if (ig(pornstar, 'isLoaded'))
            setHeaderText(getHeaderText(pornstar, true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            pornstar: PornstarRecord(ig(state, 'app', 'pornstars', 'pornstar')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
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
    })
)(Pornstar)
