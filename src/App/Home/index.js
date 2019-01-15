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

import ErrorContent from '../../generic/ErrorContent'
import {withStylesProps, getRouterContext, immutableProvedGet as ig} from '../helpers'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'

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

    renderListItemLink = (x, idx, arr, classes) => <Link to={`/porn-star/${x.get('subPage')}${x.get('sort')}`}
        key={x.get('id')}
        className={classes.routerLink}
    >
        <ListItem
            button
            classes={{
                gutters: classes.itemGutters
            }}
        >
            <ListItemIcon>
                {idx !== 0 && x.get('letter') === arr.getIn([(idx - 1), 'letter'])
                    ? <PermIdentityIcon></PermIdentityIcon>
                    : <LetterIcon>{x.get('letter')}</LetterIcon>}

            </ListItemIcon>
            <ListItemText
                classes={{
                    root: classes.listItemTextRoot,
                    primary: classes.primaryTypography,
                    secondary: classes.secondaryTypography
                }}
                primary={x.get('name')}
                secondary={x.get('itemsCount')}
            />
        </ListItem>
    </Link>,

    Home = ({classes, currentBreakpoint, pageUrl, search, home, chooseSort, isSSR}) => <Page>
        { home.get('isFailed')
            ? <ErrorContent/>
            : home.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>Top Rated Straight Niches</Typography>
                    <NichesList>
                        {home.get('nichesList').map(x => <Niche key={x.get('id')}>
                            <Link
                                to={`/all-niches/${x.get('subPage')}`}
                                key={x.get('id')}
                                className={classes.routerLink}
                            >
                                <NicheImage thumb={x.get('thumb')}/>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    classes={{
                                        root: classes.nicheTitleTypography
                                    }}
                                >{x.get('name')}</Typography>
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
                        {home.get('pornstarsList').map((x, idx, arr) =>
                            renderListItemLink(x, idx, arr, classes))}
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
            loadPage: (event, value) => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.home.get('isLoading') && !this.props.home.get('isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStylesProps(muiStyles)
)(Home)
