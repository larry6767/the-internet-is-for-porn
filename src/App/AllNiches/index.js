import {Record} from 'immutable'
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Link} from 'react-router-dom'
import FolderIcon from '@material-ui/icons/Folder'

import {
    List as ListComponent,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Typography,
} from '@material-ui/core'

import {
    getHeaderText,
    withStylesProps,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getPageRequestParams,
} from '../helpers'

import {immutableI18nAllNichesModel, routerContextModel} from '../models'
import {dataModel} from './models'
import ErrorContent from '../../generic/ErrorContent'
import PageTextHelmet from '../../generic/PageTextHelmet'
import {routerGetters} from '../../router-builder'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import {AllNichesPage, Content, PageWrapper} from './assets'
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

    AllNiches = ({classes, data, getChildLink, i18nAllNiches}) => <AllNichesPage>
        { ig(data, 'isFailed')
            ? <ErrorContent/>
            : ig(data, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageTextHelmet pageText={ig(data, 'pageText')}/>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {ig(i18nAllNiches, 'pageHeader')}
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
            </Content>
        }
    </AllNichesPage>,

    NichesRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        lastPageRequestParams: null,

        nichesList: null,
        pageText: null,
    }),

    loadPageFlow = ({data, loadPage, setHeaderText, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (!(
            ig(data, 'isLoading') ||
            (
                (ig(data, 'isLoaded') || ig(data, 'isFailed')) &&
                pageRequestParams.equals(ig(data, 'lastPageRequestParams'))
            )
        ))
            loadPage(pageRequestParams)
        else if (ig(data, 'isLoaded'))
            setHeaderText(getHeaderText(g(data, []), true))
   }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: NichesRecord(ig(state, 'app', 'niches', 'all')),
            i18nAllNiches: ig(state, 'app', 'locale', 'i18n', 'allNiches'),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
        setHeaderText: props => headerText => props.setNewText(headerText),
        getChildLink: props => child => routerGetters.niche.link(g(props, 'routerContext'), child),
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
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        currentBreakpoint: PropTypes.string,
        data: dataModel,
        i18nAllNiches: immutableI18nAllNichesModel,
        routerContext: routerContextModel,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        setHeaderText: PropTypes.func,
        getChildLink: PropTypes.func,
    })
)(AllNiches)
