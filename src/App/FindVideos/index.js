// TODO: this page needs propTypes
import React from 'react'
import {Record, Map, List} from 'immutable'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'

import {immutableProvedGet as ig} from '../helpers'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import VideoList from '../../generic/VideoList'
import {Page, Content, PageWrapper} from './assets'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    FindVideosRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        lastSubPageForRequest: '',

        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,

        sortList: List(),
        currentSort: null,
        itemsCount: 0,
        videoList: List(),

        lastSubPage: '',
    }),

    FindVideos = ({
        classes,
        i18nOrdering,
        findVideos,
        chooseSort,
        isSSR,
    }) => <Page>
        { findVideos.get('isFailed')
            ? <ErrorContent/>
            : findVideos.get('isLoading')
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
                        {findVideos.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        i18nOrdering={i18nOrdering}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={findVideos.get('pagesCount')}
                        pageNumber={findVideos.get('pageNumber')}
                        itemsCount={findVideos.get('itemsCount')}
                        sortList={findVideos.get('sortList')}
                        currentSort={findVideos.get('currentSort')}
                        archiveFilms={findVideos.get('archiveFilms')}
                        tagArchiveListOlder={findVideos.get('tagArchiveListOlder')}
                        tagArchiveListNewer={findVideos.get('tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={findVideos.get('videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({search, findVideos, loadPage}) => {
        const
            {sort, page, key} = queryString.parse(search)

        let // !== relevant - because relevant by default, without postfix '-relevant'
            subPageForRequest = sort && sort !== 'relevant'
                ? `-${sort}`
                : ''

            subPageForRequest = key
                ? `${subPageForRequest}?q=${key}`
                : subPageForRequest

            subPageForRequest = page > 0
                ? `${subPageForRequest}&p=${page}`
                : subPageForRequest

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            findVideos.get('isLoading') ||
            (
                (findVideos.get('isLoaded') || findVideos.get('isFailed')) &&
                subPageForRequest === findVideos.get('lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
    }

export default compose(
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            findVideos: FindVideosRecord(ig(state, 'app', 'findVideos')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            search: ig(state, 'router', 'location', 'search'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
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
)(FindVideos)
