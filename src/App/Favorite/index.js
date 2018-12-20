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
        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,
        itemsCount: 0,
        videoList: List(),
    }),

    Favorite = ({
        classes, pageUrl, search,
        favorite, isSSR,
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
                            ? `${favorite.getIn(['pageText', 'listHeader'])
                                .replace(/[0-9]/g, '')}${favorite.get('videoList').size}`
                            : favorite.getIn(['pageText', 'listHeaderEmpty'])
                        }
                    </Typography>
                    <ControlBar
                        pageUrl={pageUrl}
                        search={search}
                        isSSR={isSSR}
                        pagesCount={favorite.get('pagesCount')}
                        pageNumber={favorite.get('pageNumber')}
                        itemsCount={favorite.get('itemsCount')}
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
                this.props.loadPage()
            }
        }
    }),
    withStyles(muiStyles)
)(Favorite)
