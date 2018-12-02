import React from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
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
import getSubPage from '../../../shared-src/routes/niche/getSubPage'
import ControlBar from '../../../generic/ControlBar'
import ErrorContent from '../../../generic/ErrorContent'
import Lists from '../../../generic/Lists'
import VideoList from '../../../generic/VideoList'
import {
    Page,
    Content,
    PageWrapper,
} from './assets'
import actions from './actions'

const
    PornstarRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        currentPage: '',
        currentSubPage: '',
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
    }),

    Pornstar = ({pageUrl, search, pornstar, chooseSort, isSSR}) => <Page>
        { pornstar.get('isFailed')
            ? <ErrorContent/>
            : pornstar.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    pageUrl={pageUrl}
                    tagList={pornstar.get('tagList')}
                    tagArchiveList={pornstar.get('tagArchiveList')}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {pornstar.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        pageUrl={pageUrl}
                        search={search}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        page={pornstar.get('currentPage')}
                        subPage={pornstar.get('currentSubPage')}
                        pagesCount={pornstar.get('pagesCount')}
                        pageNumber={pornstar.get('pageNumber')}
                        itemsCount={pornstar.get('itemsCount')}
                        sortList={pornstar.get('sortList')}
                        currentSort={pornstar.get('currentSort')}
                        archiveFilms={pornstar.get('archiveFilms')}
                        tagArchiveListOlder={pornstar.get('tagArchiveListOlder')}
                        tagArchiveListNewer={pornstar.get('tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={pornstar.get('videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({search, match, pornstar, loadPage}) => {
        const
            {sort, page} = queryString.parse(search),

            subPageForRequest =
                match.params[0] && match.params[1]
                ? getSubPage(match.params.child, sort, page, [match.params[0], match.params[1]])
                : getSubPage(match.params.child, sort, page)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            pornstar.get('isLoading') ||
            (
                (pornstar.get('isLoaded') || pornstar.get('isFailed')) &&
                subPageForRequest === pornstar.get('lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
    }

export default compose(
    connect(
        state => ({
            pornstar: PornstarRecord(state.getIn(['app', 'pornstars', 'pornstar'])),
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
    })
)(Pornstar)
