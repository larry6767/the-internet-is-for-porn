import React from 'react'
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import {withStyles} from '@material-ui/core/styles'
import {niches} from './fixtures'
import css from './assets/_.module.scss'

console.log(niches)
const
    listHeight = Math.ceil(Object.keys(niches).length / 5) * 64,
    styles = {
        root: {
            width: '20%',
            height: listHeight,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap'
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
    },

    ListItemLink = (props) => <ListItem button component="a" {...props} />,

    AllNiches = ({classes}) => <div className={css.page}>
        <List
            component="div"
            classes={{
                root: classes.root
            }}
        >
            {
                Object.keys(niches).map((item, index) => <ListItemLink key={item} button href="/">
                    <ListItemIcon>
                        <FolderIcon/>
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            root: classes.listItemTextRoot,
                            primary: classes.primaryTypography,
                            secondary: classes.secondaryTypography
                        }}
                        primary={niches[item].name}
                        secondary={niches[item].items_count}
                    />
                </ListItemLink>)
            }
        </List>
    </div>

export default withStyles(styles)(AllNiches)
