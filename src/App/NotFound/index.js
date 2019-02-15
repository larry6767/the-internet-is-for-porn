import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
// import {withStyles} from '@material-ui/core/styles'
import {Record} from 'immutable'

import {
    // getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    // areWeSwitchedOnPage,
    get404PageText,
} from '../helpers'

// import {immutableI18nButtonsModel, routerContextModel} from '../models'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import PageTextHelmet from '../../generic/PageTextHelmet'
import VideoList from '../../generic/VideoList'
import {PageWrapper} from './assets'
// import headerActions from '../MainHeader/actions'
import actions from './actions'
// import {muiStyles} from './assets/muiStyles'

const
    DataRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        lastPageRequestParams: null,

        pageText: null,
        pageNumber: null,
        pagesCount: null,
        itemsCount: null,
        videoList: null,
    }),

    Favorite = ({data}) => <Fragment>
        <PageTextHelmet pageText={get404PageText()}/>
        <PageWrapper>
            <VideoList
                videoList={ig(data, 'videoList')}
            />
        </PageWrapper>
    </Fragment>,

    // setNewPageFlow = (prevProps, nextProps) => {
    //     if (areWeSwitchedOnPage(prevProps, nextProps))
    //         nextProps.setNewText(getHeaderText(g(nextProps, 'data'), true))
    // },

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
            data: DataRecord(ig(state, 'app', 'notFound')),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            // setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
            // setNewPageFlow(null, this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
            // setNewPageFlow(this.props, nextProps)
        },
    }),
    // withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        data: ImmutablePropTypes.record, // TODO better type

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
    }),
    loadingWrapper({
        withMoviesList: true,
    })
)(Favorite)
