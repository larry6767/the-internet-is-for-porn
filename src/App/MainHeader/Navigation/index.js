import {includes} from 'lodash'
import React from 'react'
import {compose, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab} from '@material-ui/core'

import {
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
} from '../../helpers'

import {routerGetters} from '../../../router-builder'
import {immutableI18nNavigationModel, routerContextModel} from '../../models'
import {muiStyles} from './assets/muiStyles'
import {Nav} from './assets'
import actions from './actions'
import {navMenuOrder} from './models'

const
    Navigation = ({classes, isSSR, i18nNav, goToPath, getLinkByNavKey, currentSection}) => <Nav>
        <Tabs
            value={includes(navMenuOrder, currentSection) ? currentSection : false}
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

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            i18nNav: ig(state, 'app', 'locale', 'i18n', 'navigation'),
            routerContext: getRouterContext(state),
            currentSection: ig(state, 'app', 'mainHeader', 'navigation', 'currentSection'),
        }),
        {
            setNewPath: g(actions, 'setNewPath'),
        }
    ),
    withHandlers({
        getLinkByNavKey: props => navKey => {
            switch (navKey) {
                case 'home':
                case 'allNiches':
                case 'pornstars':
                    return g(routerGetters, navKey, 'link')(g(props, 'routerContext'))
                case 'allMovies':
                case 'favorite':
                    return g(routerGetters, navKey, 'link')(g(props, 'routerContext'), null)
                default:
                    throw new Error(`Unexpected navigation key: ${JSON.stringify(navKey)}`)
            }
        }
    }),
    withHandlers({
        goToPath: props => (event, value) => {
            event.preventDefault()
            props.setNewPath(props.getLinkByNavKey(value))
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nNav: immutableI18nNavigationModel,
        goToPath: PropTypes.func,
        getLinkByNavKey: PropTypes.func,
        currentSection: PropTypes.nullable(PropTypes.string),
    })
)(Navigation)
