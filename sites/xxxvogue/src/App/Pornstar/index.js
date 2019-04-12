import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, withHandlers, withProps, withPropsOnChange, withState, lifecycle} from 'recompose'
import Typography from '@material-ui/core/Typography'
import {remove} from 'immutable'

// local libs
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
} from 'src/App/helpers'

import {
    routerContextModel,
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    immutableI18nPornstarInfoParametersModel,
    refModel,
} from 'src/App/models'

import {model, immutablePornstarInfoForTableModel} from 'src/App/Pornstar/models'
import routerGetters from 'src/App/routerGetters'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import ControlBar from 'src/generic/ControlBar'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import Lists from 'src/generic/Lists'
import VideoList from 'src/generic/VideoList'
import Info from 'src/App/Pornstar/Info'
import {PageWrapperNextToList} from 'src/App/Pornstar/assets'
import appActions from 'src/App/actions'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/Pornstar/actions'
import {PORNSTAR} from 'src/App/constants'

const
    Pornstar = ({
        cb, htmlLang, i18nOrdering, i18nButtons, i18nLabelShowing, i18nPornstarInfoParameters,
        data, chooseSort, isSSR, favoritePornstarList,
        controlLinkBuilder, modelLinkBuilder,
        addToFavoriteHandler, removeFromFavoriteHandler,
        orderedPornstarInfoForTable, setPageWrapperRef, pageWrapperRef,
    }) => <Fragment>
        <PageTextHelmet htmlLang={htmlLang} pageText={ig(data, 'pageText')}/>
        {!pageWrapperRef && !isSSR ? null : <Lists
            cb={cb}
            maxHeight={!isSSR ? g(pageWrapperRef, 'clientHeight') : null}
            modelsList={ig(data, 'modelsList')}
            modelLinkBuilder={modelLinkBuilder}
        />}
        <PageWrapperNextToList ref={setPageWrapperRef}>
            <Typography variant="h4" gutterBottom>
                {ig(data, 'pageText', 'listHeader')}
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
                sponsorsList={ig(data, 'sponsorsList')}
                currentSponsor={ig(data, 'currentSponsor')}
            />
            <VideoList
                videoListRandomWidthForPage={PORNSTAR}
                videoList={ig(data, 'videoList')}
            />
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
            data: ig(state, 'app', PORNSTAR),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
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
    withState('pageWrapperRef', 'setPageWrapperRef', null),
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

        chooseSort: props => event => {
            event.preventDefault()
            props.setNewSort({
                newSortValue: event.target.value,
                pornstarCode: g(props, 'pornstarCode'),
            })
        },

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
        htmlLang: PropTypes.string,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        i18nPornstarInfoParameters: immutableI18nPornstarInfoParametersModel,
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),
        pageWrapperRef: refModel,
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
        setPageWrapperRef: PropTypes.func,
    }),
    loadingWrapper({
        withLists: true,
        withPornstarInfo: true,
        withControlBar: true,
        withMoviesList: true,
        videoListRandomWidthForPage: PORNSTAR,
    })
)(Pornstar)
