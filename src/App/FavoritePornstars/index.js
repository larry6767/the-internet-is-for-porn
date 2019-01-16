// TODO: this page needs refactoring (propTypes, ig, ext)
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, setPropTypes} from 'recompose'
import {withStyles} from '@material-ui/core'
import {
    CircularProgress,
    Typography
} from '@material-ui/core'
import {
    Record,
    Map,
    List,
} from 'immutable'
import {
    getRouterContext,
    immutableProvedGet as ig,
} from '../helpers'
import {
    immutableI18nButtonsModel,
    routerContextModel
} from '../models'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import PornstarList from '../../generic/PornstarList'
import {
    Page,
    Content,
    PageWrapper,
} from './assets'
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
        classes, isSSR, routerContext, i18nButtons,
        favorite, pageUrl, search,
    }) => <Page>
        { favorite.get('isFailed')
            ? <ErrorContent/>
            : favorite.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {favorite.get('pornstarList').size
                            ? `${favorite.getIn(['pageText', 'listHeader'])
                                .replace(/[0-9]/g, '')}${favorite.get('pornstarList').size}`
                            : favorite.getIn(['pageText', 'listHeaderEmpty'])
                        }
                    </Typography>
                    <ControlBar
                        isSSR={isSSR}
                        routerContext={routerContext}
                        i18nButtons={i18nButtons}
                        pageUrl={pageUrl}
                        search={search}
                        pagesCount={favorite.get('pagesCount')}
                        pageNumber={favorite.get('pageNumber')}
                        itemsCount={favorite.get('itemsCount')}
                        favoriteButtons={true}
                    />
                    <PornstarList
                        pornstarList={favorite.get('pornstarList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
            routerContext: getRouterContext(state),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            favorite: FavoriteRecord(state.getIn(['app', 'favoritePornstars'])),
            pageUrl: state.getIn(['router', 'location', 'pathname']),
            search: state.getIn(['router', 'location', 'search']),
        }),
        dispatch => ({
            loadPage: () => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.favorite.get('isLoading') && !this.props.favorite.get('isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStyles(muiStyles),
    setPropTypes({
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,
    }),
)(FavoritePornstars)
