import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {Link} from 'react-router-dom'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Typography
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import Immutable from 'immutable'

import ErrorMessage from '../../generic/ErrorMessage'
import {withStylesProps} from '../helpers'

import actions from './actions'
import {Page} from './assets'

const
    styles = (theme, {niches, currentBreakpoint}) => {
        const
            nichesList = niches.get('nichesList')

        return {
            root: {
                width: niches.get('isLoading') ? 'auto' : '100%',
                display: 'grid',
                gridAutoFlow: 'column',
                gridTemplateRows:
                    currentBreakpoint === 'md'
                        ? `repeat(${Math.ceil(nichesList.size / 4)}, 1fr)`
                        : currentBreakpoint === 'sm'
                        ? `repeat(${Math.ceil(nichesList.size / 3)}, 1fr)`
                        : currentBreakpoint === 'xs'
                        ? `repeat(${Math.ceil(nichesList.size / 2)}, 1fr)`
                        : currentBreakpoint === 'xxs'
                        ? `repeat(${Math.ceil(nichesList.size / 1)}, 1fr)`
                        : `repeat(${Math.ceil(nichesList.size / 5)}, 1fr)`,
            },
            listItemTextRoot: {
                paddingLeft: 0,
                paddingRight: 0,
                display: currentBreakpoint === 'xxs'
                    ? 'flex'
                    : 'block',
                alignItems: 'center',
            },
            primaryTypography: {
                fontSize: 14,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                marginRight: currentBreakpoint === 'xxs'
                    ? 10
                    : 0
            },
            secondaryTypography: {
                fontSize: 12
            },
            itemGutters: {
                paddingLeft: 10,
                paddingRight: 10
            },
            routerLink: {
                textDecoration: 'none'
            }
        }
    },

    renderListItemLink = (x, classes) =>
        <Link to={`/all-niches/${x.get('subPage')}`}
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

    AllNiches = ({classes, niches}) => <Page>
        { niches.get('isFailed')
            ? <div>
                <Typography variant="body1" gutterBottom>Some shit is happened 8==э</Typography>
                <Typography variant="body1" gutterBottom>Please try again</Typography>
                <ErrorMessage/>
            </div>
            : <List
                component="div"
                classes={{
                    root: classes.root
                }}
            >
                { niches.get('isLoading')
                    ? <CircularProgress/>
                    : niches.get('nichesList').map(x => renderListItemLink(x, classes))
                }
            </List>
        }
    </Page>,

    // `Record` for filtering taken data from store
    NichesRecord = Immutable.Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        nichesList: Immutable.List(),
    })

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
    withStylesProps(styles)
)(AllNiches)
