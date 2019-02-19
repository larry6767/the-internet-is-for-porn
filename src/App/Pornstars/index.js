import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import Typography from '@material-ui/core/Typography'

import {
    getHeaderWithOrientation,
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
} from '../helpers'

import {routerContextModel} from '../models'
import {model} from './models'
import routerGetters from '../routerGetters'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import PageTextHelmet from '../../generic/PageTextHelmet'
import PornstarList from '../../generic/PornstarList'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {PageWrapper} from './assets'

const
    Pornstars = ({data, linkBuilder, i18nPornstarsHeader}) => <Fragment>
        <PageTextHelmet pageText={ig(data, 'pageText')}/>
        <PageWrapper>
            <Typography variant="h4" gutterBottom>
                {i18nPornstarsHeader}
            </Typography>
            <PornstarList
                linkBuilder={linkBuilder}
                pornstarList={ig(data, 'modelsList')}
            />
        </PageWrapper>
    </Fragment>,

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps))
            nextProps.setNewText(getHeaderText(g(nextProps, 'data'), true))
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
            data: ig(state, 'app', 'pornstars', 'all'),
            routerContext: getRouterContext(state),
            i18nPornstarsHeader: getHeaderWithOrientation(state, 'pornstars'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), g(child, []), null),
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
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        data: model,
        routerContext: routerContextModel,
        i18nPornstarsHeader: PropTypes.string,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        linkBuilder: PropTypes.func,
    }),
    loadingWrapper({
        withPornstarList: true,
    })
)(Pornstars)
