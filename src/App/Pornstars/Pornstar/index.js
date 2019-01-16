import React from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {CircularProgress, Typography} from '@material-ui/core'
import {Record, Map, List} from 'immutable'

import {getSubPage, immutableProvedGet as ig} from '../../helpers'
import ControlBar from '../../../generic/ControlBar'
import ErrorContent from '../../../generic/ErrorContent'
import Lists from '../../../generic/Lists'
import VideoList from '../../../generic/VideoList'

import Info from './Info'
import {Page, Content, PageWrapper} from './assets'
import actions from './actions'

const
    PornstarRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        modelInfoIsOpen: Boolean,

        currentSubPage: '',
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,
        sortList: List(),
        currentSort: null,
        itemsCount: 0,
        videoList: List(),
        modelsList: List(),
        modelInfo: List(),
        modelThumb: '',
    }),

    Pornstar = ({
        currentBreakpoint, pageUrl, search, i18nOrdering, pornstar, chooseSort,
        isSSR, modelInfoHandler, modelInfoIsOpen
    }) => <Page>
        { pornstar.get('isFailed')
            ? <ErrorContent/>
            : pornstar.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <Lists
                    currentBreakpoint={currentBreakpoint}
                    pageUrl={pageUrl}
                    modelsList={pornstar.get('modelsList')}
                />
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {pornstar.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <Info
                        modelThumb={pornstar.get('modelThumb')}
                        modelInfo={pornstar.get('modelInfo')}
                        modelInfoHandler={modelInfoHandler}
                        modelInfoIsOpen={modelInfoIsOpen}
                        currentBreakpoint={currentBreakpoint}
                        isSSR={isSSR}
                    />
                    <ControlBar
                        pageUrl={pageUrl}
                        search={search}
                        i18nOrdering={i18nOrdering}

                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        subPage={pornstar.get('currentSubPage')}
                        pagesCount={pornstar.get('pagesCount')}
                        pageNumber={pornstar.get('pageNumber')}
                        itemsCount={pornstar.get('itemsCount')}
                        sortList={pornstar.get('sortList')}
                        currentSort={pornstar.get('currentSort')}
                        archiveFilms={null}
                        tagArchiveListOlder={null}
                        tagArchiveListNewer={null}
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
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            pornstar: PornstarRecord(ig(state, 'app', 'pornstars', 'pornstar')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pageUrl: ig(state, 'router', 'location', 'pathname'),
            search: ig(state, 'router', 'location', 'search'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            modelInfoIsOpen: ig(state, 'app', 'pornstars', 'pornstar', 'modelInfoIsOpen'),
        }),
        dispatch => ({
            loadPage: subPageForRequest => dispatch(actions.loadPageRequest(subPageForRequest)),
            chooseSort: (newSortValue, stringifiedQS) => dispatch(actions.setNewSort({
                newSortValue: newSortValue,
                stringifiedQS: stringifiedQS
            })),
            modelInfoHandler: state => dispatch(actions.toggleModelInfo(state)),
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
