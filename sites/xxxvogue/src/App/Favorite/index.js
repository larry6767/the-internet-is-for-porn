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
    PropTypes,
    setPropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
} from 'src/App/helpers'

import {model} from 'src/App/Favorite/models'
import {routerContextModel} from 'src/App/models'
import routerGetters from 'src/App/routerGetters'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import ControlBar from 'src/generic/ControlBar'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import VideoList from 'src/generic/VideoList'
import {PageWrapper} from 'src/App/Favorite/assets'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/Favorite/actions'
import {muiStyles} from 'src/App/Favorite/assets/muiStyles'
import {FAVORITE} from 'src/App/constants'

const
    favoriteButtons = {
        movies: true,
        pornstars: false,
    },

    Favorite = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        <PageWrapper>
            <Typography
                variant="h4"
                gutterBottom
                className={g(props, 'classes', 'typographyTitle')}
            >
                {g(ig(props.data, 'videoList'), 'size')
                    ? `${(ig(props.data, 'pageText', 'listHeader') || '')
                        .replace(/[0-9]/g, '')}${g(ig(props.data, 'videoList'), 'size')}`
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
            <VideoList
                videoListRandomWidthForPage={FAVORITE}
                videoList={ig(props.data, 'videoList')}
            />
            {g(ig(props.data, 'videoList'), 'size') < 20 ? null : <ControlBar
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
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            data: ig(state, 'app', FAVORITE),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        controlLinkBuilder: props => qsParams =>
            routerGetters.favorite.link(
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
        routerContext: routerContextModel,
        htmlLang: PropTypes.string,
        data: model,
        controlLinkBuilder: PropTypes.func,
        controlFavoriteLinkBuilder: PropTypes.func,
        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
    }),
    loadingWrapper({
        withControlBar: true,
        withMoviesList: true,
        videoListRandomWidthForPage: FAVORITE,
    })
)(Favorite)
