import {includes} from 'lodash'
import React from 'react'
import {compose, withHandlers, withPropsOnChange, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

// local libs
import {
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getLinkByNavKey as getLinkByNavKeyHandler,
} from 'src/App/helpers'

import {immutableI18nNavigationModel, routerContextModel} from 'src/App/models'
import {muiStyles} from 'src/App/MainHeader/Navigation/assets/muiStyles'
import {Nav} from 'src/App/MainHeader/Navigation/assets'
import actions from 'src/App/MainHeader/Navigation/actions'
import {navMenuOrder} from 'src/App/MainHeader/Navigation/models'

import {
    ALL_NICHES,
    NICHE,
    ALL_MOVIES,
    PORNSTARS,
    PORNSTAR,
    FAVORITE,
    FAVORITE_PORNSTARS,
    VIDEO,
    FIND_VIDEOS,
    SITE,
} from 'src/App/constants'

import {textColor, indicatorColor} from 'src/App/MainHeader/Navigation/fixtures'

const
    Navigation = props => <Nav>
        <Tabs
            value={
                includes(g(props, 'navMenuItems'),
                g(props, 'preparedCurrentSection')) ? g(props, 'preparedCurrentSection') : false
            }
            onChange={g(props, 'goToPath')}
            variant={g(props, 'isSSR') ? null : 'scrollable'}
            scrollButtons="off"
            textColor={textColor}
            indicatorColor={indicatorColor}
        >
            {g(props, 'navMenuItems').map((navKey, index) => {
                const
                    link = props.getLinkByNavKey(navKey)

                /* WARNING! <a> with `href` attribute is important to give bare links to SSR */
                return <Tab
                    key={index /* the order never change */}
                    href={link}
                    value={navKey}
                    label={ig(props.i18nNav, navKey, 'title')}
                    classes={g(props, 'classedBounds', 'tab')}
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
    withHandlers({getLinkByNavKey: getLinkByNavKeyHandler}),
    withHandlers({
        goToPath: props => (event, value) => {
            event.preventDefault()
            props.setNewPath(props.getLinkByNavKey(value))
        },
    }),

    // never updates because `isSSR` is static
    withPropsOnChange([], props => ({
        navMenuItems: g(props, 'isSSR')
            // favorites don't work on SSR side, we can't like anything on SSR side.
            ? Object.freeze(navMenuOrder.filter(x => x !== FAVORITE))
            : navMenuOrder,
    })),
    withPropsOnChange(['currentSection'], props => {
        const
            currentSection = g(props, 'currentSection'),
            relatedSectionsMapForAllMovies = [ALL_MOVIES, SITE, VIDEO, FIND_VIDEOS],
            relatedSectionsMapForAllNiches = [ALL_NICHES, NICHE],
            relatedSectionsMapForPornstars = [PORNSTARS, PORNSTAR],
            relatedSectionsMapForFavorite = [FAVORITE, FAVORITE_PORNSTARS]

        return {
            preparedCurrentSection: includes(relatedSectionsMapForAllMovies, currentSection)
                ? ALL_MOVIES
                : includes(relatedSectionsMapForAllNiches, currentSection)
                ? ALL_NICHES
                : includes(relatedSectionsMapForPornstars, currentSection)
                ? PORNSTARS
                : includes(relatedSectionsMapForFavorite, currentSection)
                ? FAVORITE
                : currentSection
        }
    }),
    onlyUpdateForKeys(['currentSection']),
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            tab: Object.freeze({
                root: g(props, 'classes', 'labelRoot'),
                label: g(props, 'classes', 'label'),
            }),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            labelRoot: PropTypes.string,
            label: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            tab: PropTypes.object,
        }),

        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nNav: immutableI18nNavigationModel,
        goToPath: PropTypes.func,
        getLinkByNavKey: PropTypes.func,
        currentSection: PropTypes.nullable(PropTypes.string),
        navMenuItems: PropTypes.arrayOf(PropTypes.string),
    })
)(Navigation)
