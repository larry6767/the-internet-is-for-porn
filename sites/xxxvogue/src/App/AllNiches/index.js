import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import Typography from '@material-ui/core/Typography'

// local libs
import {
    withStylesProps,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
} from 'src/App/helpers'

import {routerContextModel} from 'src/App/models'
import {model} from 'src/App/AllNiches/models'
import routerGetters from 'src/App/routerGetters'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import actions from 'src/App/AllNiches/actions'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import ListWithLabels from 'src/generic/ListWithLabels'
import {PageWrapper} from 'src/App/AllNiches/assets'
import {muiStyles} from 'src/App/AllNiches/assets/muiStyles'

const
    AllNiches = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        <PageWrapper>
            <Typography variant="h4" paragraph>
                {g(props, 'i18nAllNichesHeader')}
            </Typography>
            <ListWithLabels
                list={ig(props.data, 'nichesList')}
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
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: ig(state, 'app', 'allNiches'),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nAllNichesHeader: ig(state, 'app', 'locale', 'i18n', 'headers', 'allNiches'),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
        }
    ),
    onlyUpdateForKeys(['data', 'cb']),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        listsNicheLinkBuilder: props => child =>
            routerGetters.niche.link(g(props, 'routerContext'), child, null),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    withStylesProps(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            listComponent: Object.freeze({root: g(props, 'classes', 'listComponentRoot')}),
            listItem: Object.freeze({gutters: g(props, 'classes', 'itemGutters')}),
            listItemText: Object.freeze({
                root: g(props, 'classes', 'listItemTextRoot'),
                primary: g(props, 'classes', 'primaryTypography'),
                secondary: g(props, 'classes', 'secondaryTypography'),
            }),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            listComponentRoot: PropTypes.string,
            itemGutters: PropTypes.string,
            listItemTextRoot: PropTypes.string,
            primaryTypography: PropTypes.string,
            secondaryTypography: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            listComponent: PropTypes.object,
            listItem: PropTypes.object,
            listItemText: PropTypes.object,
        }),
        cb: PropTypes.string,
        data: model,
        htmlLang: PropTypes.string,
        i18nAllNichesHeader: PropTypes.string,
        routerContext: routerContextModel,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        listsNicheLinkBuilder: PropTypes.func,
    }),
    loadingWrapper({
        isAllNiches: true,
    })
)(AllNiches)
