import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Typography
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import ErrorMessage from '../../generic/ErrorMessage'
import {withStylesProps} from '../helpers'
import actions from './actions'
import {Page} from './assets'

const
    styles = (theme, {nichesList, currentBreakpoint, isLoading}) => ({
        root: {
            width: isLoading ? 'auto' : '100%',
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
        }
    }),

    renderListItemLink = (x, classes) =>
        <ListItem
            key={x.get('id')}
            button href={x.get('sub_url')}
            component="a"
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
                secondary={x.get('items_count')}
            />
        </ListItem>,

    AllNiches = ({
        classes,
        nichesList,
        isLoading,
        isFailed,
    }) => <Page>
        { isFailed
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
                {
                    isLoading
                        ? <CircularProgress/>
                        : nichesList.map((x, idx) =>
                            renderListItemLink(x, classes))
                }
            </List>
        }
    </Page>

export default compose(
    connect(
        state => ({
            currentBreakpoint: state.getIn(['app', 'ui', 'currentBreakpoint']),
            nichesList: state.getIn(['app', 'niches', 'nichesList']),
            isLoading: state.getIn(['app', 'niches', 'isLoading']),
            isLoaded: state.getIn(['app', 'niches', 'isLoaded']),
            isFailed: state.getIn(['app', 'niches', 'isFailed']),
        }),
        dispatch => ({
            loadPage: (event, value) => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.isLoading && !this.props.isLoaded) {
                this.props.loadPage()
            }
        }
    }),
    withStylesProps(styles)
)(AllNiches)
