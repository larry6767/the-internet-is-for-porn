// TODO: this page needs refactoring (propTypes, ig, ext)
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import {
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    breakpoints,
    PropTypes,
} from '../helpers'

import {
    immutableI18nButtonsModel,
    routerContextModel,
} from '../models'

import {model} from './models'
import routerGetters from '../routerGetters'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import ControlBar from '../../generic/ControlBar'
import PageTextHelmet from '../../generic/PageTextHelmet'
import PornstarList from '../../generic/PornstarList'
import {PageWrapper} from './assets'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    favoriteButtons = {
        movies: false,
        pornstars: true,
    },

    FavoritePornstars = ({
        classes,
        isSSR,
        cb,
        htmlLang,
        i18nButtons,
        i18nLabelShowing,
        controlLinkBuilder,
        controlFavoriteLinkBuilder,
        data,
        linkBuilder,
    }) => <Fragment>
        <PageTextHelmet htmlLang={htmlLang} pageText={ig(data, 'pageText')}/>
        <PageWrapper>
            <Typography
                variant="h4"
                gutterBottom
                classes={{
                    root: g(classes, 'typographyTitle')
                }}
            >
                {g(ig(data, 'modelsList'), 'size')
                    ? `${(ig(data, 'pageText', 'listHeader') || '')
                        .replace(/[0-9]/g, '')}${g(ig(data, 'modelsList'), 'size')}`
                    : ig(data, 'pageText', 'listHeaderEmpty')
                }
            </Typography>
            <ControlBar
                isSSR={isSSR}
                cb={cb}
                i18nButtons={i18nButtons}
                i18nLabelShowing={i18nLabelShowing}
                linkBuilder={controlLinkBuilder}
                favoriteLinkBuilder={controlFavoriteLinkBuilder}
                pagesCount={ig(data, 'pagesCount')}
                pageNumber={ig(data, 'pageNumber')}
                itemsCount={ig(data, 'itemsCount')}
                favoriteButtons={favoriteButtons}
                archiveFilms={null}
                tagArchiveListOlder={null}
                tagArchiveListNewer={null}
                archiveLinkBuilder={null}
            />
            <PornstarList
                linkBuilder={linkBuilder}
                pornstarList={ig(data, 'modelsList')}
            />
        </PageWrapper>
    </Fragment>,

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps))
            nextProps.setNewText(getHeaderText(ig(nextProps.data, 'pageText'), true))
    },

    loadPageFlow = ({data, loadPage, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(data, pageRequestParams))
            loadPage(pageRequestParams)
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            routerContext: getRouterContext(state),
            data: ig(state, 'app', 'favoritePornstars'),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nLabelShowing: ig(state, 'app', 'locale', 'i18n', 'labels', 'showing'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        controlLinkBuilder: props => qsParams =>
            routerGetters.favoritePornstars.link(
                g(props, 'routerContext'),
                {...qsParams},
                ['pagination']
            ),

        controlFavoriteLinkBuilder: props => section =>
            g(routerGetters, section).link(g(props, 'routerContext'), null),

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), child, null),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
            setNewPageFlow(null, this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
            setNewPageFlow(this.props, nextProps)
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        data: model,
        cb: PropTypes.oneOf(breakpoints),
        routerContext: routerContextModel,
        htmlLang: PropTypes.string,
        i18nButtons: immutableI18nButtonsModel,
    }),
    loadingWrapper({
        withControlBar: true,
        withPornstarList: true,
    })
)(FavoritePornstars)
