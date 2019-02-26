// TODO: this page needs propTypes
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
    FindVideos = ({
        classes,
        currentBreakpoint,
        htmlLang,
        i18nOrdering,
        i18nButtons,
        i18nLabelShowing,
        data,
        chooseSort,
        isSSR,
        controlLinkBuilder,
    }) => <Fragment>
        <PageTextHelmet htmlLang={htmlLang} pageText={ig(data, 'pageText')}/>
        <PageWrapper>
            <Typography
                variant="h4"
                gutterBottom
                classes={{
                    root: classes.typographyTitle
                }}
            >
                {ig(data, 'pageText', 'listHeader')}
            </Typography>
            <ControlBar
                cb={currentBreakpoint}
                i18nOrdering={i18nOrdering}
                i18nButtons={i18nButtons}
                i18nLabelShowing={i18nLabelShowing}
                chooseSort={chooseSort}
                isSSR={isSSR}
                pagesCount={ig(data, 'pagesCount')}
                pageNumber={ig(data, 'pageNumber')}
                itemsCount={ig(data, 'itemsCount')}
                sortList={ig(data, 'sortList')}
                currentSort={ig(data, 'currentSort')}
                archiveFilms={null}
                tagArchiveListOlder={null}
                tagArchiveListNewer={null}
                linkBuilder={controlLinkBuilder}
                archiveLinkBuilder={null}
            />
            <VideoList
                videoList={ig(data, 'videoList')}
            />
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
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: ig(state, 'app', 'findVideos'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            routerContext: getRouterContext(state),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nLabelShowing: ig(state, 'app', 'locale', 'i18n', 'labels', 'showing'),
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
    }),
    loadingWrapper({
        withControlBar: true,
        withMoviesList: true,
    })
)(FindVideos)
