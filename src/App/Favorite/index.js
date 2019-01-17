// TODO: this page needs propTypes
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, setPropTypes, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record, Map, List} from 'immutable'

import {
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
} from '../helpers'

import {immutableI18nButtonsModel, routerContextModel} from '../models'
import {routerGetters} from '../../router-builder'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import VideoList from '../../generic/VideoList'
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
        videoList: List(),
    }),

    Favorite = ({
        classes,
        isSSR,
        i18nButtons,
        favorite,
        controlLinkBuilder,
        controlFavoriteLinkBuilder,
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
    </Page>

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            favorite: FavoriteRecord(ig(state, 'app', 'favorite')),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
        }
    ),
    withHandlers({
        loadPage: props => pageUrl => props.loadPageRequest(pageUrl),

        controlLinkBuilder: props => qsParams =>
            routerGetters.favorite.link(g(props, 'routerContext'), {
                ordering: null,
                ...qsParams,
            }),

        controlFavoriteLinkBuilder: props => section =>
            g(routerGetters, section).link(g(props, 'routerContext'), null),
    }),
    lifecycle({
        componentDidMount() {
            if (!ig(this.props.favorite, 'isLoading') && !ig(this.props.favorite, 'isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStyles(muiStyles),
    setPropTypes({
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,
        pageUrl: PropTypes.string,
        favorite: ImmutablePropTypes.record, // TODO better type
        controlLinkBuilder: PropTypes.func,
        controlFavoriteLinkBuilder: PropTypes.func,
        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
    }),
)(Favorite)
