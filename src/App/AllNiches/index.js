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
import FolderIcon from '@material-ui/icons/Folder'
import {
    Record,
    List,
} from 'immutable'
import ErrorContent from '../../generic/ErrorContent'
import {withStylesProps} from '../helpers'
import actions from './actions'
import {
    AllNichesPage,
    Content,
    PageWrapper,
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    NichesRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        nichesList: List(),
    }),

    renderListItemLink = (x, classes) => <Link to={`/all-niches/${x.get('subPage')}`}
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
                <FolderIcon/>
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

    AllNiches = ({classes, niches}) => <AllNichesPage>
        { niches.get('isFailed')
            ? <ErrorContent/>
            : niches.get('isLoading')
            ? <CircularProgress/>
            :<Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        All Niches
                    </Typography>
                    <ListComponent
                        component="div"
                        classes={{
                            root: classes.root
                        }}
                    >
                        {niches.get('nichesList').map(x => renderListItemLink(x, classes))}
                    </ListComponent>
                </PageWrapper>
            </Content>
        }
    </AllNichesPage>

export default compose(
    connect(
        state => ({
            currentBreakpoint: state.getIn(['app', 'ui', 'currentBreakpoint']),
            niches: NichesRecord(state.getIn(['app', 'niches', 'all'])),
        }),
        dispatch => ({
            loadPage: (event, value) => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.niches.get('isLoading') && !this.props.niches.get('isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStylesProps(muiStyles)
)(AllNiches)
