import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, withHandlers, withProps, lifecycle} from 'recompose'
import Typography from '@material-ui/core/Typography'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    getRouterContext,
    setPropTypes,
    PropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
} from 'src/App/helpers'

import {routerContextModel} from 'src/App/models'
import {model} from 'src/App/Niche/models'
import routerGetters from 'src/App/routerGetters'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import ControlBar from 'src/generic/ControlBar'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import ListWithLabels from 'src/generic/ListWithLabels'
import VideoList from 'src/generic/VideoList'
import {PageWrapper} from 'src/App/Niche/assets'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/Niche/actions'
import {NICHE} from 'src/App/constants'

const
    Niche = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        <PageWrapper>
            <ControlBar
                header={ig(props.data, 'pageText', 'listHeader')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                sortList={ig(props.data, 'sortList')}
                durationList={ig(props.data, 'durationList')}
                sponsorsList={ig(props.data, 'sponsorsList')}
                archiveFilms={ig(props.data, 'archiveFilms')}
                chooseSort={g(props, 'chooseSort')}
                linkBuilder={g(props, 'controlLinkBuilder')}
                backFromArchiveLinkBuilder={g(props, 'controlBackFromArchiveLinkBuilder')}
            />
            <VideoList
                videoListRandomWidthForPage={NICHE}
                videoList={ig(props.data, 'videoList')}
            />

            { ! g(ig(props.data, 'tagArchiveList'), 'size') ? null : <Fragment>
                <Typography variant="h4" paragraph>{g(props, 'i18nListArchive')}</Typography>
                <ListWithLabels
                    list={ig(props.data, 'tagArchiveList')}
                    isArchive={true}
                    linkBuilder={g(props, 'listsArchiveLinkBuilder')}
                />
            </Fragment>}

            <Typography variant="h4" paragraph>{g(props, 'i18nMoreCategories')}</Typography>
            <ListWithLabels
                list={ig(props.data, 'nichesListWithLetter')}
                linkBuilder={g(props, 'listsNicheLinkBuilder')}
            />
        </PageWrapper>
    </Fragment>,

    loadPageFlow = ({data, loadPage, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(data, pageRequestParams))
            loadPage(pageRequestParams)
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            data: ig(state, 'app', NICHE),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nMoreCategories: ig(state, 'app', 'locale', 'i18n', 'headers', 'moreCategories'),
            i18nListArchive: ig(state, 'app', 'locale', 'i18n', 'headers', 'listArchive'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withProps(props => ({
        nicheCode: g(props, 'match', 'params', 'child'),
        archiveParams:
            !(props.match.params[0] && props.match.params[1]) ? null : {
                year: g(props, 'match', 'params', 0),
                month: g(props, 'match', 'params', 1),
            },
    })),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        chooseSort: props => event => {
            event.preventDefault()
            props.setNewSort({
                sortName: event.target.name,
                newSortValue: event.target.value,
                nicheCode: g(props, 'nicheCode'),
                archiveParams: g(props, 'archiveParams'),
            })
        },

        controlLinkBuilder: props => qsParams =>
            g(props, 'archiveParams') === null
            ? routerGetters.niche.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                qsParams,
                ['ordering', 'pagination', 'sponsor', 'duration']
            )
            : routerGetters.nicheArchive.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                g(props, 'archiveParams', 'year'),
                g(props, 'archiveParams', 'month'),
                qsParams,
                ['pagination', 'sponsor', 'duration']
            ),

        controlBackFromArchiveLinkBuilder: props => () =>
            routerGetters.niche.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                null
            ),

        listsNicheLinkBuilder: props => child =>
            routerGetters.niche.link(g(props, 'routerContext'), child, null),

        listsArchiveLinkBuilder: props => (year, month) =>
            routerGetters.nicheArchive.link(
                g(props, 'routerContext'),
                g(props, 'nicheCode'),
                year,
                month,
                null
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
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        data: model,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        htmlLang: PropTypes.string,
        i18nMoreCategories: PropTypes.string,
        i18nListArchive: PropTypes.string,
        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        setNewSort: PropTypes.func,
        chooseSort: PropTypes.func,
        controlLinkBuilder: PropTypes.func,
        controlBackFromArchiveLinkBuilder: PropTypes.func,
        listsNicheLinkBuilder: PropTypes.func,
        listsArchiveLinkBuilder: PropTypes.func,
    }),
    loadingWrapper({
        withControlBar: true,
        withMoviesList: true,
        videoListRandomWidthForPage: NICHE,
    })
)(Niche)
