import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// local libs
import {
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    get404PageText,
} from 'src/App/helpers'

import {routerContextModel, immutablePageTextModel} from 'src/App/models'
import {model} from 'src/App/NotFound/models'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import VideoList from 'src/generic/VideoList'
import {PageWrapper} from 'src/App/NotFound/assets'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/NotFound/actions'
import {muiStyles} from 'src/App/NotFound/assets/muiStyles'

const
    NotFound = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={g(props, 'pageText')}/>
        <PageWrapper>
            <Typography variant="h4" gutterBottom>
                {ig(props.pageText, 'headerTitle')}
            </Typography>
            <VideoList videoList={ig(props.data, 'videoList')}/>
        </PageWrapper>
    </Fragment>,

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps))
            nextProps.setNewText(getHeaderText(g(nextProps, 'pageText'), true))
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
            data: ig(state, 'app', 'notFound'),
            routerContext: getRouterContext(state),
            pageText: get404PageText(state),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
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
        routerContext: routerContextModel,
        pageText: immutablePageTextModel,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        htmlLang: PropTypes.string,
    }),
    loadingWrapper({
        withMoviesList: true,
    })
)(NotFound)
