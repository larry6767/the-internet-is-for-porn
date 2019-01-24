// TODO: this page needs propTypes
import React from 'react'
import {get} from 'lodash'
import {Record, Map, List} from 'immutable'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'

import {
    getHeaderText,
    getRouterContext,
    localizedGetSubPage,
    immutableProvedGet as ig,
    plainProvedGet as g,
} from '../helpers'

import {routerGetters} from '../../router-builder'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import Head from '../../generic/Head'
import VideoList from '../../generic/VideoList'
import {Page, Content, PageWrapper} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    FindVideosRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastOrientationCode: '',
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: Map(),
        pagesCount: 1,
        sortList: List(),
        currentSort: null,
        itemsCount: 0,
        videoList: List(),
    }),

    FindVideos = ({
        classes,
        i18nOrdering,
        i18nButtons,
        findVideos,
        chooseSort,
        isSSR,
        controlLinkBuilder,
    }) => <Page>
        { ig(findVideos, 'isFailed')
            ? <ErrorContent/>
            : ig(findVideos, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <Head
                    title={g(findVideos, 'pageText', 'title')}
                    description={g(findVideos, 'pageText', 'description')}
                    keywords={g(findVideos, 'pageText', 'keywords')}
                />
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
                        i18nButtons={i18nButtons}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={ig(findVideos, 'pagesCount')}
                        pageNumber={ig(findVideos, 'pageNumber')}
                        itemsCount={ig(findVideos, 'itemsCount')}
                        sortList={ig(findVideos, 'sortList')}
                        currentSort={ig(findVideos, 'currentSort')}
                        archiveFilms={null}
                        tagArchiveListOlder={null}
                        tagArchiveListNewer={null}
                        linkBuilder={controlLinkBuilder}
                        archiveLinkBuilder={null}
                    />
                    <VideoList
                        videoList={ig(findVideos, 'videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({
        search, routerContext, findVideos,
        loadPage, setHeaderText, currentOrientation,
    }) => {
        const
            qs = queryString.parse(search),
            ordering = get(qs, [ig(routerContext, 'router', 'ordering', 'qsKey')], null),
            pagination = get(qs, [ig(routerContext, 'router', 'pagination', 'qsKey')], null),
            searchQuery = get(qs, [ig(routerContext, 'router', 'searchQuery', 'qsKey')], null),
            getSubPage = localizedGetSubPage(routerContext),
            subPageForRequest = getSubPage(null, ordering, pagination, [], searchQuery)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            ig(findVideos, 'isLoading') ||
            (
                (ig(findVideos, 'isLoaded') || ig(findVideos, 'isFailed')) &&
                g(currentOrientation, []) === ig(findVideos, 'lastOrientationCode') &&
                subPageForRequest === ig(findVideos, 'lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
        else if (ig(findVideos, 'isLoaded'))
            setHeaderText(getHeaderText(g(findVideos, []), true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            findVideos: FindVideosRecord(ig(state, 'app', 'findVideos')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            search: ig(state, 'router', 'location', 'search'),
            routerContext: getRouterContext(state),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => subPageForRequest => props.loadPageRequest({
            orientationCode: g(props, 'currentOrientation'),
            subPageForRequest: g(subPageForRequest, []),
        }),

        setHeaderText: props => headerText => props.setNewText(headerText),

        chooseSort: props => newSortValue => props.setNewSort({newSortValue}),

        controlLinkBuilder: props => qsParams => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            qsParams,
            ['ordering', 'pagination', 'searchQuery']
        ),
    }),
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
