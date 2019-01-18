// TODO: this page needs refactoring (propTypes, ig, ext)
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record, Map, List} from 'immutable'

import {
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
} from '../helpers'

import {
    immutableI18nButtonsModel,
    routerContextModel
} from '../models'

import {routerGetters} from '../../router-builder'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import PornstarList from '../../generic/PornstarList'
import {Page, Content, PageWrapper} from './assets'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    FavoriteRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,
        itemsCount: 0,
        pornstarList: List(),
    }),

    FavoritePornstars = ({
        classes,
        isSSR,
        i18nButtons,
        controlLinkBuilder,
        controlFavoriteLinkBuilder,
        favorite,
        linkBuilder,
    }) => <Page>
        { ig(favorite, 'isFailed')
            ? <ErrorContent/>
            : ig(favorite, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: g(classes, 'typographyTitle')
                        }}
                    >
                        {g(ig(favorite, 'pornstarList'), 'size')
                            ? `${(ig(favorite, 'pageText', 'listHeader') || '')
                                .replace(/[0-9]/g, '')}${g(ig(favorite, 'pornstarList'), 'size')}`
                            : ig(favorite, 'pageText', 'listHeaderEmpty')
                        }
                    </Typography>
                    <ControlBar
                        isSSR={isSSR}
                        i18nButtons={i18nButtons}
                        linkBuilder={controlLinkBuilder}
                        favoriteLinkBuilder={controlFavoriteLinkBuilder}
                        pagesCount={ig(favorite, 'pagesCount')}
                        pageNumber={ig(favorite, 'pageNumber')}
                        itemsCount={ig(favorite, 'itemsCount')}
                        favoriteButtons={true}
                    />
                    <PornstarList
                        linkBuilder={linkBuilder}
                        pornstarList={ig(favorite, 'pornstarList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    sectionPortal,
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            favorite: FavoriteRecord(ig(state, 'app', 'favoritePornstars')),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
        }
    ),
    withHandlers({
        loadPage: props => () => props.loadPageRequest(),

        controlLinkBuilder: props => qsParams =>
            routerGetters.favoritePornstars.link(g(props, 'routerContext'), {
                ordering: null,
                ...qsParams,
            }),

        controlFavoriteLinkBuilder: props => section =>
            g(routerGetters, section).link(g(props, 'routerContext'), null),

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), child, null),
    }),
    lifecycle({
        componentDidMount() {
            if (!ig(this.props.favorite, 'isLoading') && !ig(this.props.favorite, 'isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,
    }),
)(FavoritePornstars)
