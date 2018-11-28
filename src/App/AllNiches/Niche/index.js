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
import getSubPage from '../../../shared-src/routes/niche/get-subpage'
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
    NicheRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        currentNiche: '',

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

    Niche = ({pageUrl, search, niche, chooseSort, isSSR}) => <Page>
        { niche.get('isFailed')
            ? <ErrorContent/>
            : niche.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    pageUrl={pageUrl}
                    tagList={niche.get('tagList')}
                    tagArchiveList={niche.get('tagArchiveList')}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {niche.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        pageUrl={pageUrl}
                        search={search}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        currentNiche={niche.get('currentNiche')}
                        pagesCount={niche.get('pagesCount')}
                        pageNumber={niche.get('pageNumber')}
                        itemsCount={niche.get('itemsCount')}
                        sortList={niche.get('sortList')}
                        currentSort={niche.get('currentSort')}
                        archiveFilms={niche.get('archiveFilms')}
                        tagArchiveListOlder={niche.get('tagArchiveListOlder')}
                        tagArchiveListNewer={niche.get('tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={niche.get('videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({search, match, niche, loadPage}) => {
        const
            {sort, page} = queryString.parse(search),

            subPage =
                match.params[0] && match.params[1]
                ? getSubPage(match.params.child, sort, page, [match.params[0], match.params[1]])
                : getSubPage(match.params.child, sort, page)

        if (typeof subPage !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPage" type: "${typeof subPage}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            niche.get('isLoading') ||
            (
                (niche.get('isLoaded') || niche.get('isFailed')) &&
                subPage === niche.get('lastSubPage')
            )
        ))
            loadPage(subPage)
    }

export default compose(
    connect(
        state => ({
            niche: NicheRecord(state.getIn(['app', 'niches', 'niche'])),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
            pageUrl: state.getIn(['router', 'location', 'pathname']),
            search: state.getIn(['router', 'location', 'search']),
        }),
        dispatch => ({
            loadPage: subPage => dispatch(actions.loadPageRequest(subPage)),
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
)(Niche)
