import React from 'react'
import queryString from 'query-string'
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
import getSubPage from '../../shared-src/routes/niche/getSubPage'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import Lists from '../../generic/Lists'
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

        tagList: List(),
        tagArchiveList: List(),
        sortList: List(),
        currentSort: '',
        archiveFilms: Map(),
        tagArchiveListOlder: fromJS(),
        tagArchiveListNewer: fromJS(),
        itemsCount: 0,
        videoList: List(),

        lastSubPage: '',
    }),

    Favorite = ({classes, currentBreakpoint, pageUrl, search, favorite, chooseSort, isSSR}) => <Page>
        { favorite.get('isFailed')
            ? <ErrorContent/>
            : favorite.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    currentBreakpoint={currentBreakpoint}
                    pageUrl={pageUrl}
                    tagList={favorite.get('tagList')}
                    tagArchiveList={favorite.get('tagArchiveList')}
                />
                <FavoritePageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {favorite.getIn(['pageText', 'listHeader'])}
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
                    />
                    <VideoList
                        videoList={favorite.get('videoList')}
                    />
                </FavoritePageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({search, match, favorite, loadPage}) => {
        const
            {sort, page} = queryString.parse(search),

            subPageForRequest =
                match.params[0] && match.params[1]
                ? getSubPage(null, sort, page, [match.params[0], match.params[1]])
                : getSubPage(null, sort, page)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            favorite.get('isLoading') ||
            (
                (favorite.get('isLoaded') || favorite.get('isFailed')) &&
                subPageForRequest === favorite.get('lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
    }

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
            loadPage: subPageForRequest => dispatch(actions.loadPageRequest(subPageForRequest)),
            chooseSort: (newSortValue, stringifiedQS) => dispatch(actions.setNewSort({
                newSortValue: newSortValue,
                stringifiedQS: stringifiedQS
            }))
        })
    ),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    withStyles(muiStyles)
)(Favorite)
