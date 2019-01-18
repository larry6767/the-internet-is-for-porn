import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
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
    getHeaderText
} from '../helpers'

import {routerGetters} from '../../router-builder'
import ErrorContent from '../../generic/ErrorContent'
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

        currentPage: '',
        lastSubPageForRequest: '',

        pageText: Map(),

        nichesList: List(),
        pornstarsList: List(),
    }),

    renderListItemLink = (x, idx, arr, classes, routerContext) => <Link
        to={routerGetters.pornstar.link(routerContext, ig(x, 'subPage'), null)}
        key={ig(x, 'id')}
        className={classes.routerLink}
    >
        <ListItem
            button
            classes={{
                gutters: classes.itemGutters
            }}
        >
            <ListItemIcon>
                {idx !== 0 && ig(x, 'letter') === ig(arr, [(idx - 1), 'letter'])
                    ? <PermIdentityIcon></PermIdentityIcon>
                    : <LetterIcon>{ig(x, 'letter')}</LetterIcon>}

            </ListItemIcon>
            <ListItemText
                classes={{
                    root: classes.listItemTextRoot,
                    primary: classes.primaryTypography,
                    secondary: classes.secondaryTypography
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
                                className={classes.routerLink}
                            >
                                <NicheImage thumb={ig(x, 'thumb')}/>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    classes={{
                                        root: classes.nicheTitleTypography
                                    }}
                                >{ig(x, 'name')}</Typography>
                            </Link>
                        </Niche>)}
                    </NichesList>
                    <Typography variant="h4" gutterBottom>Top Rated Straight Pornstars</Typography>
                    <ListComponent
                        component="div"
                        classes={{
                            root: classes.root
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
    </Page>

export default compose(
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            home: HomeRecord(ig(state, 'app', 'home')),
            routerContext: getRouterContext(state),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
        }),
        dispatch => ({
            loadPage: (event, value) => dispatch(actions.loadPageRequest()),
            setHeaderText: (headerText) => dispatch(
                headerActions.setNewText(headerText)
            ),
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!ig(this.props.home, 'isLoading') && !ig(this.props.home, 'isLoaded'))
                this.props.loadPage()
            else if (ig(this.props.home, 'isLoaded'))
                this.props.setHeaderText(getHeaderText(g(this, 'props', 'home'), true))
        }
    }),
    withStylesProps(muiStyles)
)(Home)
