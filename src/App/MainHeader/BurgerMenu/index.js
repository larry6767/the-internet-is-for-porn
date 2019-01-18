import React, {Fragment} from 'react'
import {compose, withHandlers, withState} from 'recompose'
import {connect} from 'react-redux'
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {withStyles} from '@material-ui/core/styles'

import {
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getLinkByNavKey,
} from '../../helpers'

import {immutableI18nNavigationModel, routerContextModel} from '../../models'
import Language from '../Language'
import actionsNavigation from '../Navigation/actions'
import {navMenuOrder} from '../Navigation/models'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    menuIconStyle = Object.freeze({fill: "#a1a7b1"}),

    BurgerMenu = ({
        classes,
        anchorEl,
        isOpened,
        pathname,
        openModal,
        closeModal,
        goToPath,
        i18nNav,
        currentSection,
    }) => <Fragment>
        <IconButton
            aria-owns={isOpened ? 'burger-menu' : null}
            aria-label="burger-menu"
            aria-haspopup="true"
            onClick={openModal}
        >
            <MenuIcon style={menuIconStyle}/>
        </IconButton>
        <Menu
            id="burger-menu"
            anchorEl={anchorEl}
            open={isOpened}
            onClose={closeModal}
            classes={{
                paper: g(classes, 'paper'),
            }}
        >
            {navMenuOrder.map((navKey, index) =>
                <MenuItem
                    key={index /* the order never change */}
                    selected={navKey === currentSection}
                    onClick={goToPath(navKey)}
                >
                    {ig(i18nNav, navKey, 'title')}
                </MenuItem>
            )}
            <Language/>
        </Menu>
    </Fragment>

export default compose(
    connect(
        state => ({
            isOpened: ig(state, 'app', 'mainHeader', 'burgerMenu', 'isOpened'),
            pathname: ig(state, 'router', 'location', 'pathname'),
            i18nNav: ig(state, 'app', 'locale', 'i18n', 'navigation'),
            routerContext: getRouterContext(state),
            currentSection: ig(state, 'app', 'mainHeader', 'navigation', 'currentSection'),
        }),
        {
            setNewPath: g(actionsNavigation, 'setNewPath'),
            open: g(actions, 'open'),
            close: g(actions, 'close'),
        }
    ),
    withState('anchorEl', 'setAnchorEl', null),
    withHandlers({
        getLinkByNavKey,

        openModal: props => event => {
            props.open()
            props.setAnchorEl(g(event, 'currentTarget'))
        },

        closeModal: props => event => {
            props.close()
            props.setAnchorEl(null)
        },
    }),
    withHandlers({
        goToPath: props => value => event => {
            event.preventDefault()
            props.setNewPath(props.getLinkByNavKey(value))
            props.close()
            props.setAnchorEl(null)
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        anchorEl: PropTypes.object.isOptional,
        setAnchorEl: PropTypes.func,
        isOpened: PropTypes.bool,
        pathname: PropTypes.string,
        routerContext: routerContextModel,
        i18nNav: immutableI18nNavigationModel,
        goToPath: PropTypes.func,
        openModal: PropTypes.func,
        closeModal: PropTypes.func,
        getLinkByNavKey: PropTypes.func,
        currentSection: PropTypes.nullable(PropTypes.string),
    })
)(BurgerMenu)
