import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps} from 'recompose'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record, remove} from 'immutable'

import {
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    ImmutablePropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    breakpoints,
} from '../../helpers'

import {
    routerContextModel,
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    immutableI18nPornstarInfoParametersModel,
    PageTextRecord,
} from '../../models'

import {PornstarInfoRecord} from './models'

import {dataModel} from './models'
import {routerGetters} from '../../../router-builder'
import sectionPortal from '../../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../../MainHeader/Niche/orientationPortal'
import ControlBar from '../../../generic/ControlBar'
import ErrorContent from '../../../generic/ErrorContent'
import PageTextHelmet from '../../../generic/PageTextHelmet'
import Lists from '../../../generic/Lists'
import VideoList from '../../../generic/VideoList'

import Info from './Info'
import {Page, Content, PageWrapper} from './assets'
import appActions from '../../../App/actions'
import headerActions from '../../MainHeader/actions'
import actions from './actions'

const
    Pornstar = ({
        cb, i18nOrdering, i18nButtons, i18nLabelShowing, i18nPornstarInfoParameters,
        data, chooseSort, isSSR, modelInfoHandler, modelInfoIsOpen, favoritePornstarList,
        controlLinkBuilder, modelLinkBuilder,
        addToFavoriteHandler, removeFromFavoriteHandler,
    }) => <Page>
        { ig(data, 'isFailed')
            ? <ErrorContent/>
            : ig(data, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageTextHelmet pageText={ig(data, 'pageText')}/>
                <Lists
                    currentBreakpoint={cb}
                    modelsList={ig(data, 'modelsList')}
                    modelLinkBuilder={modelLinkBuilder}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {data.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <Info
                        i18nPornstarInfoParameters={i18nPornstarInfoParameters}
                        pornstarInfo={ig(data, 'pornstarInfo')}
                        pornstarInfoForTable={ig(data, 'pornstarInfoForTable')}
                        modelInfoHandler={modelInfoHandler}
                        modelInfoIsOpen={modelInfoIsOpen}
                        favoritePornstarList={favoritePornstarList}
                        cb={cb}
                        isSSR={isSSR}
                        addToFavoriteHandler={addToFavoriteHandler}
                        removeFromFavoriteHandler={removeFromFavoriteHandler}
                    />
                    <ControlBar
                        cb={cb}
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
        isLoading: null,
        isLoaded: null,
        isFailed: null,
        modelInfoIsOpen: null,

        lastPageRequestParams: null,

        pageText: PageTextRecord(),

        pageNumber: null,
        pagesCount: null,
        itemsCount: null,

        sortList: null,
        currentSort: null,

        videoList: null,
        modelsList: null,
        pornstarInfoForTable: null,
        pornstarInfo: PornstarInfoRecord(),
    }),

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
            data: DataRecord(ig(state, 'app', 'pornstars', 'pornstar')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nLabelShowing: ig(state, 'app', 'locale', 'i18n', 'labels', 'showing'),
            i18nPornstarInfoParameters: ig(state, 'app', 'locale', 'i18n', 'pornstarInfoParameters'),
            modelInfoIsOpen: ig(state, 'app', 'pornstars', 'pornstar', 'modelInfoIsOpen'),
            favoritePornstarList: ig(state, 'app', 'ui', 'favoritePornstarList'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            toggleModelInfo: g(actions, 'toggleModelInfo'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
            addPornstarToFavorite: g(appActions, 'addPornstarToFavorite'),
            removePornstarFromFavorite: g(appActions, 'removePornstarFromFavorite'),
        }
    ),
    withProps(props => ({
        pornstarCode: g(props, 'match', 'params', 'child'),
    })),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        modelInfoHandler: props => state => props.toggleModelInfo(state),

        chooseSort: props => newSortValue => props.setNewSort({
            newSortValue,
            pornstarCode: g(props, 'pornstarCode'),
        }),

        controlLinkBuilder: props => qsParams => routerGetters.pornstar.link(
            g(props, 'routerContext'),
            g(props, 'pornstarCode'),
            qsParams,
            ['ordering', 'pagination']
        ),

        modelLinkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), child, null),

        addToFavoriteHandler: props => event => {
            event.preventDefault()

            const
                id = Number(g(event.currentTarget.getAttribute('data-favorite-pornstar-id'), [])),
                x = remove(
                    ig(props.data, 'modelsList').find(x => ig(x, 'id') === id),
                    'letter'
                )

            props.addPornstarToFavorite(x)
        },

        removeFromFavoriteHandler: props => event => {
            event.preventDefault()

            const
                id = Number(g(event.currentTarget.getAttribute('data-favorite-pornstar-id'), [])),
                x = ig(props.data, 'modelsList').find(x => ig(x, 'id') === id)

            props.removePornstarFromFavorite(ig(x, 'id'))
        },
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
        data: dataModel,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        i18nPornstarInfoParameters: immutableI18nPornstarInfoParametersModel,
        modelInfoIsOpen: PropTypes.bool,
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        toggleModelInfo: PropTypes.func,
        modelInfoHandler: PropTypes.func,
        setNewText: PropTypes.func,
        setNewSort: PropTypes.func,
        chooseSort: PropTypes.func,
        controlLinkBuilder: PropTypes.func,
        modelLinkBuilder: PropTypes.func,
        addToFavoriteHandler: PropTypes.func,
        addPornstarToFavorite: PropTypes.func,
        removeFromFavoriteHandler: PropTypes.func,
        removePornstarFromFavorite: PropTypes.func,
    }),
)(Pornstar)
