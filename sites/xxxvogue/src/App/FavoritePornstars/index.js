import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// local libs
import {
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    PropTypes,
} from 'src/App/helpers'

import {routerContextModel} from 'src/App/models'

import {model} from 'src/App/FavoritePornstars/models'
import routerGetters from 'src/App/routerGetters'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import ControlBar from 'src/generic/ControlBar'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import PornstarList from 'src/generic/PornstarList'
import {PageWrapper} from 'src/App/FavoritePornstars/assets'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/FavoritePornstars/actions'
import {muiStyles} from 'src/App/FavoritePornstars/assets/muiStyles'

const
    favoriteButtons = {
        movies: false,
        pornstars: true,
    },

    FavoritePornstars = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        <PageWrapper>
            <Typography
                variant="h4"
                gutterBottom
                className={g(props, 'classes', 'typographyTitle')}
            >
                {g(ig(props.data, 'modelsList'), 'size')
                    ? `${(ig(props.data, 'pageText', 'listHeader') || '')
                        .replace(/[0-9]/g, '')}${g(ig(props.data, 'modelsList'), 'size')}`
                    : ig(props.data, 'pageText', 'listHeaderEmpty')
                }
            </Typography>
            <ControlBar
                linkBuilder={g(props, 'controlLinkBuilder')}
                favoriteLinkBuilder={g(props, 'controlFavoriteLinkBuilder')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                favoriteButtons={favoriteButtons}
                archiveFilms={null}
                tagArchiveListOlder={null}
                tagArchiveListNewer={null}
                archiveLinkBuilder={null}
            />
            <PornstarList pornstarList={ig(props.data, 'modelsList')}/>
            {g(ig(props.data, 'modelsList'), 'size') < 24 ? null : <ControlBar
                isDownBelow={true}
                linkBuilder={g(props, 'controlLinkBuilder')}
                favoriteLinkBuilder={g(props, 'controlFavoriteLinkBuilder')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                favoriteButtons={favoriteButtons}
                archiveFilms={null}
                tagArchiveListOlder={null}
                tagArchiveListNewer={null}
                archiveLinkBuilder={null}
            />}
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
            routerContext: getRouterContext(state),
            data: ig(state, 'app', 'favoritePornstars'),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
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
        routerContext: routerContextModel,
        htmlLang: PropTypes.string,
    }),
    loadingWrapper({
        withControlBar: true,
        withPornstarList: true,
    })
)(FavoritePornstars)
