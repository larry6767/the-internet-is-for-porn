import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withProps, withPropsOnChange} from 'recompose'
import {CircularProgress, Typography} from '@material-ui/core'
import {remove} from 'immutable'

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
    voidPagePlug,
} from '../../helpers'

import {
    routerContextModel,
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    immutableI18nPornstarInfoParametersModel,
} from '../../models'

import {model, immutablePornstarInfoForTableModel} from './models'
import routerGetters from '../../routerGetters'
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
        data, chooseSort, isSSR, favoritePornstarList,
        controlLinkBuilder, modelLinkBuilder,
        addToFavoriteHandler, removeFromFavoriteHandler,
        orderedPornstarInfoForTable,
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
                        i18nButtons={i18nButtons}
                        pornstarInfo={ig(data, 'pornstarInfo')}
                        pornstarInfoForTable={ig(orderedPornstarInfoForTable, [])}
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
            data: ig(state, 'app', 'pornstars', 'pornstar'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nLabelShowing: ig(state, 'app', 'locale', 'i18n', 'labels', 'showing'),

            i18nPornstarInfoParameters:
                ig(state, 'app', 'locale', 'i18n', 'pornstarInfoParameters'),

            favoritePornstarList: ig(state, 'app', 'ui', 'favoritePornstarList'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
            addPornstarToFavorite: g(appActions, 'addPornstarToFavorite'),
            removePornstarFromFavorite: g(appActions, 'removePornstarFromFavorite'),
        }
    ),
    withPropsOnChange(
        (prevProps, nextProps) =>
            ig(prevProps.data, 'pornstarInfoForTable') !==
            ig(nextProps.data, 'pornstarInfoForTable'),

        props => {
            const
                keysOrder = ig(props.data, 'pornstarInfoForTableKeysOrder')

            return {
                orderedPornstarInfoForTable:
                    ig(props.data, 'pornstarInfoForTable')
                        .sortBy((v, k) => keysOrder.indexOf(k)),
            }
        }
    ),
    withProps(props => ({
        pornstarCode: g(props, 'match', 'params', 'child'),
    })),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

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
        data: model,
        orderedPornstarInfoForTable: immutablePornstarInfoForTableModel,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        i18nPornstarInfoParameters: immutableI18nPornstarInfoParametersModel,
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
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
    voidPagePlug
)(Pornstar)
