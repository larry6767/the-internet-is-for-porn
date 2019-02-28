import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import {
    getHeaderText,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    setPropTypes,
    PropTypes,
} from '../helpers'

import {routerContextModel} from '../models'
import {model} from './models'
import routerGetters from '../routerGetters'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import ControlBar from '../../generic/ControlBar'
import PageTextHelmet from '../../generic/PageTextHelmet'
import VideoList from '../../generic/VideoList'
import {PageWrapper} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    FindVideos = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        <PageWrapper>
            <Typography
                variant="h4"
                gutterBottom
                className={g(props, 'classes', 'typographyTitle')}
            >
                {ig(props.data, 'pageText', 'listHeader')}
            </Typography>
            <ControlBar
                chooseSort={g(props, 'chooseSort')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                sortList={ig(props.data, 'sortList')}
                currentSort={ig(props.data, 'currentSort')}
                archiveFilms={null}
                tagArchiveListOlder={null}
                tagArchiveListNewer={null}
                linkBuilder={g(props, 'controlLinkBuilder')}
                archiveLinkBuilder={null}
            />
            <VideoList videoList={ig(props.data, 'videoList')}/>
            {g(ig(props.data, 'videoList'), 'size') < 20 ? null : <ControlBar
                isDownBelow={true}
                chooseSort={g(props, 'chooseSort')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                sortList={ig(props.data, 'sortList')}
                currentSort={ig(props.data, 'currentSort')}
                archiveFilms={null}
                tagArchiveListOlder={null}
                tagArchiveListNewer={null}
                linkBuilder={g(props, 'controlLinkBuilder')}
                archiveLinkBuilder={null}
            />}
        </PageWrapper>
    </Fragment>,

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps))
            nextProps.setNewText(getHeaderText(ig(nextProps.data, 'pageText'), true))
    },

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
            data: ig(state, 'app', 'findVideos'),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        chooseSort: props => event => {
            event.preventDefault()
            props.setNewSort({
                newSortValue: event.target.value,
            })
        },

        controlLinkBuilder: props => qsParams => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            qsParams,
            ['ordering', 'pagination', 'searchQuery']
        ),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
            setNewPageFlow(null, this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
            setNewPageFlow(this.props, nextProps)
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        data: model,
        htmlLang: PropTypes.string,
        routerContext: routerContextModel,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewSort: PropTypes.func,
        chooseSort: PropTypes.func,
        setNewText: PropTypes.func,
        controlLinkBuilder: PropTypes.func,
    }),
    loadingWrapper({
        withControlBar: true,
        withMoviesList: true,
    })
)(FindVideos)
