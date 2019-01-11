import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {Link} from 'react-router-dom'
import {
    List as ListComponent,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Typography,
} from '@material-ui/core'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import {Record, Map, List} from 'immutable'

import ErrorContent from '../../generic/ErrorContent'
import {withStylesProps} from '../helpers'
import {immutableProvedGet as ig} from '../helpers'

import {
    Page,
    Content,
    PageWrapper,
    LetterIcon,
    NichesList,
    Niche,
    NicheImage,
} from './assets'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'

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

    renderListItemLink = (x, idx, arr, classes) =><Link
        to={`/porn-star/${ig(x, 'subPage')}${ig(x, 'sort')}`}
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

    Home = ({classes, home}) => <Page>
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
                                to={`/all-niches/${ig(x, 'subPage')}`}
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
                        {ig(home, 'pornstarsList').map((x, idx) =>
                            renderListItemLink(x, idx, ig(home, 'pornstarsList'), classes))}
                    </ListComponent>
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            home: HomeRecord(ig(state, ['app', 'home'])),
        }),
        dispatch => ({
            loadPage: (event, value) => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!ig(this.props.home, 'isLoading') && !ig(this.props.home, 'isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStylesProps(muiStyles)
)(Home)
