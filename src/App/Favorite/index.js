// TODO: this page needs propTypes
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record} from 'immutable'

import {
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
} from '../helpers'

import {immutableI18nButtonsModel, routerContextModel} from '../models'
import {routerGetters} from '../../router-builder'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import PageTextHelmet from '../../generic/PageTextHelmet'
import VideoList from '../../generic/VideoList'
import {Page, Content, PageWrapper} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    FavoriteRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        lastPageRequestParams: null,

        pageText: null,
        pageNumber: null,
        pagesCount: null,
        itemsCount: null,
        videoList: null,
    }),

    Favorite = ({
        classes,
        isSSR,
        i18nButtons,
        i18nLabelShowing,
        favorite,
        controlLinkBuilder,
        controlFavoriteLinkBuilder,
    }) => <Page>
        { ig(favorite, 'isFailed')
            ? <ErrorContent/>
            : ig(favorite, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageTextHelmet pageText={ig(favorite, 'pageText')}/>
                <PageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: g(classes, 'typographyTitle'),
                        }}
                    >
                        {g(ig(favorite, 'videoList'), 'size')
                            ? `${(ig(favorite, 'pageText', 'listHeader') || '')
                                .replace(/[0-9]/g, '')}${g(ig(favorite, 'videoList'), 'size')}`
                            : ig(favorite, 'pageText', 'listHeaderEmpty')
                        }
                    </Typography>
                    <ControlBar
                        isSSR={isSSR}
                        i18nButtons={i18nButtons}
                        i18nLabelShowing={i18nLabelShowing}
                        linkBuilder={controlLinkBuilder}
                        favoriteLinkBuilder={controlFavoriteLinkBuilder}
                        pagesCount={ig(favorite, 'pagesCount')}
                        pageNumber={ig(favorite, 'pageNumber')}
                        itemsCount={ig(favorite, 'itemsCount')}
                        favoriteButtons={true}
                    />
                    <VideoList
                        videoList={ig(favorite, 'videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({favorite, loadPage, setHeaderText, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(favorite, pageRequestParams))
            loadPage(pageRequestParams)
        else if (ig(favorite, 'isLoaded'))
            setHeaderText(getHeaderText(g(favorite, []), true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nLabelShowing: ig(state, 'app', 'locale', 'i18n', 'labels', 'showing'),
            favorite: FavoriteRecord(ig(state, 'app', 'favorite')),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
        setHeaderText: props => headerText => props.setNewText(headerText),

        controlLinkBuilder: props => qsParams =>
            routerGetters.favorite.link(
                g(props, 'routerContext'),
                {...qsParams},
                ['pagination']
            ),

        controlFavoriteLinkBuilder: props => section =>
            g(routerGetters, section).link(g(props, 'routerContext'), null),
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
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,
        i18nLabelShowing: PropTypes.string,
        favorite: ImmutablePropTypes.record, // TODO better type
        controlLinkBuilder: PropTypes.func,
        controlFavoriteLinkBuilder: PropTypes.func,
        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
    }),
)(Favorite)
