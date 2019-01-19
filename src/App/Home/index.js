import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Record, Map, List} from 'immutable'
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
    withStylesProps,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    ImmutablePropTypes,
    getHeaderText,
} from '../helpers'

import {immutableI18nOrderingModel, routerContextModel, orientationCodes} from '../models'
import {routerGetters} from '../../router-builder'
import ErrorContent from '../../generic/ErrorContent'
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
    HomeRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        lastOrientationCode: '',

        pageText: Map(),

        nichesList: List(),
        pornstarsList: List(),
    }),

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

    Home = ({classes, home, routerContext}) => <Page>
        { ig(home, 'isFailed')
            ? <ErrorContent/>
            : ig(home, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>Top Rated Straight Niches</Typography>
                    <NichesList>
                        {ig(home, 'nichesList').map(x => <Niche key={ig(x, 'id')}>
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
                    <Typography variant="h4" gutterBottom>Top Rated Straight Pornstars</Typography>
                    <ListComponent
                        component="div"
                        classes={{
                            root: g(classes, 'root')
                        }}
                    >
                        {ig(home, 'pornstarsList').map((x, idx) => renderListItemLink(
                            x,
                            idx,
                            ig(home, 'pornstarsList'),
                            classes,
                            routerContext
                        ))}
                    </ListComponent>
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({currentOrientation, home, loadPage, setHeaderText}) => {
        if (!(
            ig(home, 'isLoading') ||
            (
                (ig(home, 'isLoaded') || ig(home, 'isFailed')) &&
                currentOrientation === ig(home, 'lastOrientationCode')
            )
        ))
            loadPage()
        else if (ig(home, 'isLoaded'))
            setHeaderText(getHeaderText(g(home, []), true))
   }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            home: HomeRecord(ig(state, 'app', 'home')),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
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
        home: ImmutablePropTypes.exactRecordOf({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,
            lastOrientationCode: PropTypes.string,
            pageText: ImmutablePropTypes.shape({}), // TODO better type
            nichesList: ImmutablePropTypes.listOf(ImmutablePropTypes.shape({})), // TODO better type
            pornstarsList: ImmutablePropTypes.listOf(ImmutablePropTypes.shape({})), // TODO better type
        }),
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setHeaderText: PropTypes.func,
    })
)(Home)
