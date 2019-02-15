import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Record} from 'immutable'
import {Link} from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

import ListComponent from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import {
    getHeaderWithOrientation,
    withStylesProps,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    getHeaderText,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
} from '../helpers'

import {immutableI18nOrderingModel, routerContextModel} from '../models'
import {dataModel} from './models'
import routerGetters from '../routerGetters'
import PageTextHelmet from '../../generic/PageTextHelmet'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'
import headerActions from '../MainHeader/actions'

import {PageWrapper, LetterIcon, NichesList, Niche, NicheImage} from './assets'

const
    renderListItemLink = (x, idx, arr, classes, routerContext) => <Link
        to={routerGetters.pornstar.link(routerContext, ig(x, 'subPage'), null)}
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
                {idx !== 0 && ig(x, 'letter') === ig(arr, [(idx - 1), 'letter'])
                    ? <PermIdentityIcon></PermIdentityIcon>
                    : <LetterIcon>{ig(x, 'letter')}</LetterIcon>}

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

    Home = ({
        classes, data, routerContext,
        i18nNichesHeader, i18nPornstarsHeader,
    }) => <Fragment>
        <PageTextHelmet pageText={ig(data, 'pageText')}/>
        <PageWrapper>
            <Typography variant="h4" gutterBottom>
                {i18nNichesHeader}
            </Typography>
            <NichesList>
                {ig(data, 'nichesList').map(x => <Niche key={ig(x, 'id')}>
                    <Link
                        to={routerGetters.niche.link(
                            routerContext,
                            ig(x, 'subPage'),
                            null
                        )}
                        key={ig(x, 'id')}
                        className={g(classes, 'routerLink')}
                    >
                        <NicheImage thumb={ig(x, 'thumb')}/>
                        <Typography
                            variant="body1"
                            gutterBottom
                            classes={{
                                root: g(classes, 'nicheTitleTypography')
                            }}
                        >{ig(x, 'name')}</Typography>
                    </Link>
                </Niche>)}
            </NichesList>
            <Typography variant="h4" gutterBottom>
                {i18nPornstarsHeader}
            </Typography>
            <ListComponent
                component="div"
                classes={{
                    root: g(classes, 'root')
                }}
            >
                {ig(data, 'pornstarsList').map((x, idx) => renderListItemLink(
                    x,
                    idx,
                    ig(data, 'pornstarsList'),
                    classes,
                    routerContext
                ))}
            </ListComponent>
        </PageWrapper>
    </Fragment>,

    HomeRecord = Record({
        isLoading: null,
        isLoaded: null,
        isFailed: null,

        lastPageRequestParams: null,

        pageText: null,

        nichesList: null,
        pornstarsList: null,
    }),

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps))
            nextProps.setNewText(getHeaderText(g(nextProps, 'data'), true))
    },

    loadPageFlow = ({data, loadPage, setHeaderText, routerContext, match}) => {
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
            data: HomeRecord(ig(state, 'app', 'home')),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nNichesHeader: getHeaderWithOrientation(state, 'niches'),
            i18nPornstarsHeader: getHeaderWithOrientation(state, 'pornstars'),
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
    withStylesProps(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.shape({
            routerLink: PropTypes.string,
            itemGutters: PropTypes.string,
            listItemTextRoot: PropTypes.string,
            primaryTypography: PropTypes.string,
            secondaryTypography: PropTypes.string,
            nicheTitleTypography: PropTypes.string,
            root: PropTypes.string,
        }),
        currentBreakpoint: PropTypes.string,
        data: dataModel,
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nNichesHeader: PropTypes.string,
        i18nPornstarsHeader: PropTypes.string,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
    }),
    loadingWrapper({
        isHome: true,
    })
)(Home)
