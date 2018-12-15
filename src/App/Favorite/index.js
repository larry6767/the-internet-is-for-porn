import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {withStyles} from '@material-ui/core'
import {
    CircularProgress,
    Typography
} from '@material-ui/core'
import {
    Record,
    Map,
    List,
    fromJS,
} from 'immutable'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import VideoList from '../../generic/VideoList'
import {
    Page,
    Content,
    FavoritePageWrapper,
} from './assets'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    FavoriteRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        currentPage: '',
        lastSubPageForRequest: '',

        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,

        sortList: List(),
        currentSort: '',
        archiveFilms: Map(),
        tagArchiveListOlder: fromJS(),
        tagArchiveListNewer: fromJS(),
        itemsCount: 0,
        videoList: List(),

        lastSubPage: '',
    }),

    Favorite = ({
        classes, currentBreakpoint, pageUrl,
        search, favorite, chooseSort, isSSR
    }) => <Page>
        { favorite.get('isFailed')
            ? <ErrorContent/>
            : favorite.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <FavoritePageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {favorite.get('videoList').size
                            ? `${favorite.getIn(['pageText', 'listHeader'])}${
                                favorite.get('videoList').size}`
                            : favorite.getIn(['pageText', 'listHeaderEmpty'])
                        }
                    </Typography>
                    <ControlBar
                        pageUrl={pageUrl}
                        search={search}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        page={favorite.get('currentPage')}
                        pagesCount={favorite.get('pagesCount')}
                        pageNumber={favorite.get('pageNumber')}
                        itemsCount={favorite.get('itemsCount')}
                        sortList={favorite.get('sortList')}
                        currentSort={favorite.get('currentSort')}
                        archiveFilms={favorite.get('archiveFilms')}
                        tagArchiveListOlder={favorite.get('tagArchiveListOlder')}
                        tagArchiveListNewer={favorite.get('tagArchiveListNewer')}
                        favoriteButtons={true}
                    />
                    <VideoList
                        videoList={favorite.get('videoList')}
                    />
                </FavoritePageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            currentBreakpoint: state.getIn(['app', 'ui', 'currentBreakpoint']),
            favorite: FavoriteRecord(state.getIn(['app', 'favorite'])),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
            pageUrl: state.getIn(['router', 'location', 'pathname']),
            search: state.getIn(['router', 'location', 'search']),
        }),
        dispatch => ({
            loadPage: (pageUrl) => dispatch(actions.loadPageRequest(pageUrl))
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.favorite.get('isLoading') && !this.props.favorite.get('isLoaded')) {
                this.props.loadPage(
                    ~this.props.pageUrl.indexOf('favorite-porn-stars')
                        ? 'favorite-porn-stars'
                        : ~this.props.pageUrl.indexOf('favorite')
                        ? 'favorite'
                        : null
                )
            }
        }
    }),
    withStyles(muiStyles)
)(Favorite)
