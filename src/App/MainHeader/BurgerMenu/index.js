import React, {Fragment} from 'react'
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Language from '../Language'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {navigation} from '../Navigation/fixtures'
import actionsNavigation from '../Navigation/actions'
import actions from './actions'
import {withStyles} from '@material-ui/core/styles'
import {muiStyles} from './assets/muiStyles'

const
    BurgerMenu = ({classes, anchorEl, currentPath, openAction, closeAction, toggleNavigationAction}) => <Fragment>
        <IconButton
            aria-owns={anchorEl ? 'burger-menu' : undefined}
            aria-label="burger-menu"
            aria-haspopup="true"
            onClick={openAction}
        >
            <MenuIcon style={{fill: "#a1a7b1"}}/>
        </IconButton>
        <Menu
            id="burger-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeAction}
            classes={{
                paper: classes.paper
            }}
        >
            {
                Object.keys(navigation).map((item, index) => (
                    <MenuItem
                        key={index}
                        selected={index === currentPath}
                        onClick={toggleNavigationAction}
                        data-index={index}
                    >
                        {navigation[`${item}`]}
                    </MenuItem>
                ))
            }
            <Language/>
        </Menu>
    </Fragment>

export default compose(
    connect(
        state => ({
            anchorEl: state.getIn(['app', 'mainHeader', 'burgerMenu', 'anchorEl']),
            currentPath: state.getIn(['app', 'mainHeader', 'navigation', 'currentPath'])
        }),
        dispatch => ({
            toggleNavigationAction: (event) => {
                dispatch(actionsNavigation.setNewPath(Number(event.target.dataset.index)))
                dispatch(actions.close())
            },
            openAction: event => dispatch(actions.open(event)),
            closeAction: () => dispatch(actions.close())
        })
    ),
    withStyles(muiStyles)
)(BurgerMenu)
