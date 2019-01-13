import React from 'react'
import {compose, setPropTypes, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab} from '@material-ui/core'

import {
    getValueForNavigation,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
} from '../../helpers'

import {routerGetters} from '../../../router-builder'
import {immutableLocaleRouterModel, immutableI18nNavigationModel} from '../../models'
import {muiStyles} from './assets/muiStyles'
import {Nav} from './assets'
import actions from './actions'
import {navMenuOrder} from './models'

const
    Navigation = ({classes, isSSR, pathname, i18nNav, goToPath, getLinkByNavKey}) => {
        const
            value = getValueForNavigation(getLinkByNavKey)(navMenuOrder, pathname)

        return <Nav>
            <Tabs
                value={value}
                onChange={goToPath}
                indicatorColor="primary"
                textColor="primary"
                variant={isSSR ? null : 'scrollable'}
                scrollButtons="off"
            >
                {navMenuOrder.map((navKey, index) => {
                    const
                        link = getLinkByNavKey(navKey)

                    /* WARNING! <a> with `href` attribute is important to give bare links to SSR */
                    return <Tab
                        key={index /* the order never change */}
                        href={link}
                        value={navKey}
                        label={ig(i18nNav, navKey, 'title')}
                        classes={{
                            root: g(classes, 'labelRoot'),
                            label: g(classes, 'label'),
                        }}
                    />
                })}
            </Tabs>
        </Nav>
    }

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            pathname: ig(state, 'router', 'location', 'pathname'),
            router: ig(state, 'app', 'locale', 'router'),
            i18nNav: ig(state, 'app', 'locale', 'i18n', 'navigation'),
        }),
        {
            setNewPath: g(actions, 'setNewPath'),
        }
    ),
    withStyles(muiStyles),
    withHandlers({
        getLinkByNavKey: props => navKey => g(routerGetters, navKey, 'link')(g(props, 'router')),
    }),
    withHandlers({
        goToPath: props => (event, value) => {
            event.preventDefault()
            props.setNewPath(props.getLinkByNavKey(value))
        },
    }),
    setPropTypes({
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        pathname: PropTypes.string,
        router: immutableLocaleRouterModel,
        i18nNav: immutableI18nNavigationModel,
        goToPath: PropTypes.func,
        getLinkByNavKey: PropTypes.func,
    })
)(Navigation)
