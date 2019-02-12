import {Record} from 'immutable'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Link} from 'react-router-dom'
import FolderIcon from '@material-ui/icons/Folder'

import ListComponent from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import {
    getHeaderText,
    withStylesProps,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
} from '../helpers'

import {routerContextModel} from '../models'
import {dataModel} from './models'
import PageTextHelmet from '../../generic/PageTextHelmet'
import routerGetters from '../routerGetters'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import {allNichesLoadingWrapper} from '../../generic/loadingWrapper'
import {PageWrapper} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    renderListItemLink = (x, classes, getChildLink) => <Link to={getChildLink(ig(x, 'subPage'))}
        key={ig(x, 'id')}
        className={g(classes, 'routerLink')}
    >
        <ListItem
            button
            classes={{
                gutters: g(classes, 'itemGutters'),
            }}
        >
            <ListItemIcon>
                <FolderIcon/>
            </ListItemIcon>
            <ListItemText
                classes={{
                    root: g(classes, 'listItemTextRoot'),
                    primary: g(classes, 'primaryTypography'),
                    secondary: g(classes, 'secondaryTypography')
                }}
                primary={ig(x, 'name')}
                secondary={ig(x, 'itemsCount')}
            />
        </ListItem>
    </Link>,

    AllNiches = ({classes, data, getChildLink, i18nAllNichesHeader}) => <Fragment>
        <PageTextHelmet pageText={ig(data, 'pageText')}/>
        <PageWrapper>
            <Typography variant="h4" gutterBottom>
                {i18nAllNichesHeader}
            </Typography>
            <ListComponent
                component="div"
                classes={{
                    root: g(classes, 'root')
                }}
            >
                {ig(data, 'nichesList').map(x =>
                    renderListItemLink(x, classes, getChildLink)
                )}
            </ListComponent>
        </PageWrapper>
    </Fragment>,

    DataRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        lastPageRequestParams: null,

        nichesList: null,
        pageText: null,
    }),

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
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: DataRecord(ig(state, 'app', 'niches', 'all')),
            i18nAllNichesHeader: ig(state, 'app', 'locale', 'i18n', 'headers', 'allNiches'),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
        getChildLink: props => child => routerGetters.niche.link(g(props, 'routerContext'), child),
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
    withStylesProps(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        currentBreakpoint: PropTypes.string,
        data: dataModel,
        i18nAllNichesHeader: PropTypes.string,
        routerContext: routerContextModel,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        getChildLink: PropTypes.func,
    }),
    allNichesLoadingWrapper
)(AllNiches)
