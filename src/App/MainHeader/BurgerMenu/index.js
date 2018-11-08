import React from 'react'
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Language from '../Language'
import css from './assets/_.module.scss'

import {compose} from 'recompose'
import {connect} from 'react-redux'

import {navigation} from '../Navigation/fixtures'
import {toggleNavigation} from '../Navigation/actions'
import {openBurgerMenu, closeBurgerMenu} from './actions'

import {withStyles} from '@material-ui/core/styles'

const
    styles = {
        paper: {
            width: 150
        }
    },

    BurgerMenu = ({classes, burgerMenuUi, navigationUi, openBurgerMenuAction, closeBurgerMenuAction, toggleNavigationAction}) => <div className={css.burgerMenu}>
        <IconButton
            aria-owns={burgerMenuUi.get('anchorEl') ? 'burger-menu' : undefined}
            aria-label="burger-menu"
            aria-haspopup="true"
            onClick={openBurgerMenuAction}
        >
            <MenuIcon style={{fill: "#a1a7b1"}}/>
        </IconButton>
        <Menu
            id="burger-menu"
            anchorEl={burgerMenuUi.get('anchorEl')}
            open={Boolean(burgerMenuUi.get('anchorEl'))}
            onClose={closeBurgerMenuAction}
            classes={{
                paper: classes.paper
            }}
        >
            {
                Object.keys(navigation).map((item, index) => (
                    <MenuItem
                        key={index}
                        selected={index === navigationUi.get('currentPage')}
                        onClick={toggleNavigationAction}
                        data-index={index}
                    >
                        {navigation[`${item}`]}
                    </MenuItem>
                ))
            }
            <Language/>
        </Menu>
    </div>

export default compose(
    connect(
        state => ({
            burgerMenuUi: state.getIn(['app', 'mainHeader', 'burgerMenu', 'ui']),
            navigationUi: state.getIn(['app', 'mainHeader', 'navigation', 'ui'])
        }),
        dispatch => ({
            toggleNavigationAction: (event) => {
                dispatch(toggleNavigation(Number(event.target.dataset.index)))
                dispatch(closeBurgerMenu())
            },
            openBurgerMenuAction: event => dispatch(openBurgerMenu(event)),
            closeBurgerMenuAction: () => dispatch(closeBurgerMenu())
        })
    ),
    withStyles(styles)
)(BurgerMenu)
