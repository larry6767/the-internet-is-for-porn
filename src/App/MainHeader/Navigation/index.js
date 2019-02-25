import {includes} from 'lodash'
import React from 'react'
import {compose, withHandlers, withPropsOnChange} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab} from '@material-ui/core'

import {
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getLinkByNavKey as getLinkByNavKeyHandler,
} from '../../helpers'

import {immutableI18nNavigationModel, routerContextModel} from '../../models'
import {muiStyles} from './assets/muiStyles'
import {Nav} from './assets'
import actions from './actions'
import {navMenuOrder} from './models'

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
} from '../../constants'

const
    Navigation = ({
        classes, isSSR, i18nNav, goToPath, getLinkByNavKey, preparedCurrentSection, navMenuItems
    }) => <Nav>
        <Tabs
            value={includes(navMenuItems, preparedCurrentSection) ? preparedCurrentSection : false}
            onChange={goToPath}
            indicatorColor="primary"
            textColor="primary"
            variant={isSSR ? null : 'scrollable'}
            scrollButtons="off"
        >
            {navMenuItems.map((navKey, index) => {
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

    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nNav: immutableI18nNavigationModel,
        goToPath: PropTypes.func,
        getLinkByNavKey: PropTypes.func,
        currentSection: PropTypes.nullable(PropTypes.string),
        navMenuItems: PropTypes.arrayOf(PropTypes.string),
    })
)(Navigation)
