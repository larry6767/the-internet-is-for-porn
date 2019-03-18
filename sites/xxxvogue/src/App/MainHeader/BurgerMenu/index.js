import React, {Fragment} from 'react'
import {compose, withHandlers, withState, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {connect} from 'react-redux'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {withStyles} from '@material-ui/core/styles'

// local libs
import {
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getLinkByNavKey,
} from 'src/App/helpers'

import {immutableI18nNavigationModel, routerContextModel} from 'src/App/models'
import Language from 'src/App/MainHeader/Language'
import actionsNavigation from 'src/App/MainHeader/Navigation/actions'
import {navMenuOrder} from 'src/App/MainHeader/Navigation/models'
import actions from 'src/App/MainHeader/BurgerMenu/actions'
import {muiStyles} from 'src/App/MainHeader/BurgerMenu/assets/muiStyles'

const
    menuIconStyle = Object.freeze({fill: "#a1a7b1"}),

    BurgerMenu = ({
        classedBounds,
        anchorEl,
        isOpened,
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
            classes={g(classedBounds, 'paper')}
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
    onlyUpdateForKeys(['isOpened']),
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
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            paper: Object.freeze({paper: g(props, 'classes', 'paper')}),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            paper: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            paper: PropTypes.object,
        }),
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
