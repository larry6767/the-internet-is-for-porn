import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import Typography from '@material-ui/core/Typography'

// local libs
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
} from 'src/App/helpers'

import {routerContextModel} from 'src/App/models'
import {model} from 'src/App/Pornstars/models'
import routerGetters from 'src/App/routerGetters'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import PornstarList from 'src/generic/PornstarList'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/Pornstars/actions'
import {PageWrapper} from 'src/App/Pornstars/assets'

const
    Pornstars = ({data, linkBuilder, htmlLang, i18nPornstarsHeader}) => <Fragment>
        <PageTextHelmet htmlLang={htmlLang} pageText={ig(data, 'pageText')}/>
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
            data: ig(state, 'app', 'pornstars'),
            routerContext: getRouterContext(state),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
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
        htmlLang: PropTypes.string,
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
