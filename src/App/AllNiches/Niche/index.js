import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'

import {Page} from './assets'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
})

class NestedList extends React.Component {
    state = {
        open: true,
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }))
    }

    render() {
        const { classes } = this.props

        return (
        <Page>
            <List
            component="nav"
            subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
            >
            <ListItem button>
                <ListItemIcon>
                <SendIcon />
                </ListItemIcon>
                <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText inset primary="Drafts" />
            </ListItem>
            <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText inset primary="Inbox" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Starred" />
                </ListItem>
                </List>
            </Collapse>
            </List>
        </Page>
        )
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NestedList)
