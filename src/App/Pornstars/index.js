import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {
    Record,
    List,
} from 'immutable'
import {
    CircularProgress,
    Typography,
} from '@material-ui/core'
import Favorite from '@material-ui/icons/FavoriteBorder'
import ErrorContent from '../../generic/ErrorContent'
import actions from './actions'
import {
    Page,
    Content,
    PageWrapper,
    PornstarList,
    PornstarItem,
    Thumb,
    InfoBar,
    Like,
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    PornstarsRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        pornstarsList: List(),
    }),

    renderListItem = (x, classes) => <PornstarItem key={x.get('id')}>
        <Link
            to={`/porn-star/${x.get('subPage')}`}
            className={classes.routerLink}
        >
            <Thumb thumb={x.get('thumb')} />
            <Typography
                variant="body2"
                classes={{root: classes.typographyTitle}}
            >
                {x.get('name')}
            </Typography>
            <InfoBar>
                <Like>
                    <Favorite classes={{root: classes.favoriteIcon}}/>
                </Like>
                <Typography variant="body2">
                    {`${x.get('itemsCount')} Films`}
                </Typography>
            </InfoBar>
        </Link>
    </PornstarItem>,

    Pornstars = ({classes, pornstars}) => <Page>
        { pornstars.get('isFailed')
            ? <ErrorContent/>
            : pornstars.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        Top Rated Straight Pornstars
                    </Typography>
                    <PornstarList>
                        {pornstars.get('pornstarsList').map(x => renderListItem(x, classes))}
                    </PornstarList>
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            // currentBreakpoint: state.getIn(['app', 'ui', 'currentBreakpoint']),
            pornstars: PornstarsRecord(state.getIn(['app', 'pornstars', 'all'])),
        }),
        dispatch => ({
            loadPage: (event, value) => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.pornstars.get('isLoading') && !this.props.pornstars.get('isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStyles(muiStyles)
)(Pornstars)
