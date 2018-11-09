import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import {withStylesProps} from '../helpers'
import actions from './actions'
import css from './assets/_.module.scss'

const
    styles = (theme, {nichesList}) => ({
        root: {
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateRows: `repeat(${Math.ceil(nichesList.size / 5)}, 1fr)`,
        },
        listItemTextRoot: {
            paddingLeft: 0
        },
        primaryTypography: {
            fontSize: 14,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        },
        secondaryTypography: {
            fontSize: 12
        }
    }),

    ListItemLink = (props) => <ListItem button component="a" {...props} />,

    renderListItemLink = (x, classes) =>
        <ListItemLink key={x.get('id')} button href="/">
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
        </ListItemLink>,

    AllNiches = ({
        classes,
        nichesList,
        isLoading,
        isFailed
    }) => <div className={css.page}>
        { isFailed
            ? <h1>Error! Page data loading is failed!</h1>
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
    </div>

export default compose(
    connect(
        state => ({
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
