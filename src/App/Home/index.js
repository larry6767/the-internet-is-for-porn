import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Record, List} from 'immutable'
import {Link} from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

import {
    List as ListComponent,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Typography,
} from '@material-ui/core'

import {
    getHeaderWithOrientation,
    withStylesProps,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    getHeaderText,
} from '../helpers'

import {
    immutableI18nOrderingModel,
    routerContextModel,
    orientationCodes,
    PageTextRecord,
} from '../models'

import {dataModel} from './models'
import {routerGetters} from '../../router-builder'
import ErrorContent from '../../generic/ErrorContent'
import PageTextHelmet from '../../generic/PageTextHelmet'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'
import headerActions from '../MainHeader/actions'

import {
    Page,
    Content,
    PageWrapper,
    LetterIcon,
    NichesList,
    Niche,
    NicheImage,
} from './assets'

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
    }) => <Page>
        { ig(data, 'isFailed')
            ? <ErrorContent/>
            : ig(data, 'isLoading')
            ? <CircularProgress/>
            : <Content>
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
            </Content>
        }
    </Page>,

    HomeRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        lastOrientationCode: '',

        pageText: PageTextRecord(),

        nichesList: List(),
        pornstarsList: List(),
    }),

    loadPageFlow = ({currentOrientation, data, loadPage, setHeaderText}) => {
        if (!(
            ig(data, 'isLoading') ||
            (
                (ig(data, 'isLoaded') || ig(data, 'isFailed')) &&
                g(currentOrientation, []) === ig(data, 'lastOrientationCode')
            )
        ))
            loadPage()
        else if (ig(data, 'isLoaded'))
            setHeaderText(getHeaderText(g(data, []), true))
   }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
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
        loadPage: props => () =>
            props.loadPageRequest({orientationCode: g(props, 'currentOrientation')}),

        setHeaderText: props => headerText => props.setNewText(headerText),
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
        currentOrientation: PropTypes.oneOf(orientationCodes),
        data: dataModel,
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nNichesHeader: PropTypes.string,
        i18nPornstarsHeader: PropTypes.string,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setHeaderText: PropTypes.func,
    })
)(Home)
