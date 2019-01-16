// TODO: this page needs propTypes
import React from 'react'
import {Record, Map, List, fromJS} from 'immutable'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle, setPropTypes} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'

import {getSubPage, immutableProvedGet as ig} from '../helpers'
import {immutableI18nButtonsModel} from '../models'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import Lists from '../../generic/Lists'
import VideoList from '../../generic/VideoList'
import {Page, Content, AllMoviesPageWrapper} from './assets'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    AllMoviesRecord = Record({
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
        currentSort: null,
        archiveFilms: Map(),
        tagArchiveListOlder: fromJS(),
        tagArchiveListNewer: fromJS(),
        itemsCount: 0,
        videoList: List(),

        lastSubPage: '',
    }),

    AllMovies = ({
        classes,
        currentBreakpoint,
        pageUrl,
        search,
        i18nOrdering,
        i18nButtons,
        allMovies,
        chooseSort,
        isSSR,
    }) => <Page>
        { allMovies.get('isFailed')
            ? <ErrorContent/>
            : allMovies.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    currentBreakpoint={currentBreakpoint}
                    pageUrl={pageUrl}
                    tagList={allMovies.get('tagList')}
                    tagArchiveList={allMovies.get('tagArchiveList')}
                />
                <AllMoviesPageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {allMovies.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        pageUrl={pageUrl}
                        search={search}
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        page={allMovies.get('currentPage')}
                        pagesCount={allMovies.get('pagesCount')}
                        pageNumber={allMovies.get('pageNumber')}
                        itemsCount={allMovies.get('itemsCount')}
                        sortList={allMovies.get('sortList')}
                        currentSort={allMovies.get('currentSort')}
                        archiveFilms={allMovies.get('archiveFilms')}
                        tagArchiveListOlder={allMovies.get('tagArchiveListOlder')}
                        tagArchiveListNewer={allMovies.get('tagArchiveListNewer')}
                    />
                    <VideoList
                        videoList={allMovies.get('videoList')}
                    />
                </AllMoviesPageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({search, match, allMovies, loadPage}) => {
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
            allMovies.get('isLoading') ||
            (
                (allMovies.get('isLoaded') || allMovies.get('isFailed')) &&
                subPageForRequest === allMovies.get('lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
    }

export default compose(
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            allMovies: AllMoviesRecord(ig(state, 'app', 'allMovies')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
            search: ig(state, 'router', 'location', 'search'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
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
    withStyles(muiStyles),
    setPropTypes({
        i18nButtons: immutableI18nButtonsModel,
    }),
)(AllMovies)
