// TODO: this page needs propTypes
import React from 'react'
import {Record} from 'immutable'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core'
import {CircularProgress, Typography} from '@material-ui/core'

import {
    getHeaderText,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    getPageRequestParams,
    doesItHaveToBeReloaded,
} from '../helpers'

import {routerGetters} from '../../router-builder'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ControlBar from '../../generic/ControlBar'
import ErrorContent from '../../generic/ErrorContent'
import PageTextHelmet from '../../generic/PageTextHelmet'
import VideoList from '../../generic/VideoList'
import {Page, Content, PageWrapper} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    FindVideosRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        lastPageRequestParams: null,

        pageText: null,

        pageNumber: null,
        pagesCount: null,
        itemsCount: null,

        currentSort: null,
        sortList: null,
        videoList: null,
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
                <PageTextHelmet pageText={ig(findVideos, 'pageText')}/>
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

    loadPageFlow = ({findVideos, loadPage, setHeaderText, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(findVideos, pageRequestParams))
            loadPage(pageRequestParams)
        else if (ig(findVideos, 'isLoaded'))
            setHeaderText(getHeaderText(g(findVideos, []), true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            findVideos: FindVideosRecord(ig(state, 'app', 'findVideos')),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
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
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
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
