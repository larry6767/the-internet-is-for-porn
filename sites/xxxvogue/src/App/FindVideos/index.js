import React, {Fragment} from 'react'
import queryString from 'query-string'
import {get} from 'lodash'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withState, withPropsOnChange} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

// local libs
import {
    getHeaderText,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    setPropTypes,
    PropTypes,
    getOrientationByClassId,
} from 'src/App/helpers'

import {routerContextModel, legacyOrientationPrefixesModel} from 'src/App/models'
import {model} from 'src/App/FindVideos/models'
import routerGetters from 'src/App/routerGetters'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import ControlBar from 'src/generic/ControlBar'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import VideoList from 'src/generic/VideoList'
import {PageWrapper, StyledLink} from 'src/App/FindVideos/assets'
import headerActions from 'src/App/MainHeader/actions'
import actions from 'src/App/FindVideos/actions'
import {muiStyles} from 'src/App/FindVideos/assets/muiStyles'
import {FIND_VIDEOS} from 'src/App/constants'

const
    FindVideos = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        <PageWrapper>
            {g(props, 'isSSR') ? null : <Snackbar
                ContentProps={g(props, 'snackbarContentProps')}
                anchorOrigin={g(props, 'snackbarPosition')}
                open={g(props, 'complexSnackbarState')}
                message={g(props, 'snackbarText')}
                action={g(props, 'buttonsArray')}
            />}
            <Typography
                variant="h4"
                gutterBottom
                className={g(props, 'classes', 'typographyTitle')}
            >
                {ig(props.data, 'pageText', 'listHeader')}
            </Typography>
            <ControlBar
                chooseSort={g(props, 'chooseSort')}
                pagesCount={ig(props.data, 'pagesCount')}
                pageNumber={ig(props.data, 'pageNumber')}
                itemsCount={ig(props.data, 'itemsCount')}
                sortList={ig(props.data, 'sortList')}
                currentSort={ig(props.data, 'currentSort')}
                archiveFilms={null}
                tagArchiveListOlder={null}
                tagArchiveListNewer={null}
                linkBuilder={g(props, 'controlLinkBuilder')}
                archiveLinkBuilder={null}
                sponsorsList={ig(props.data, 'sponsorsList')}
                currentSponsor={ig(props.data, 'currentSponsor')}
            />
            <VideoList
                videoListRandomWidthForPage={FIND_VIDEOS}
                videoList={ig(props.data, 'videoList')}
            />
        </PageWrapper>
    </Fragment>,

    setNewPageFlow = (prevProps, nextProps) => {
        if (areWeSwitchedOnPage(prevProps, nextProps)) {
            nextProps.setSnackbarIsOpen(true)
            nextProps.setNewText(getHeaderText(ig(nextProps.data, 'pageText'), true))
        }
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
            data: ig(state, 'app', FIND_VIDEOS),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            routerContext: getRouterContext(state),
            i18nYesButton: ig(state, 'app', 'locale', 'i18n', 'buttons', 'agree'),
            i18nOrientationSuggestionText:
                ig(state, 'app', 'locale', 'i18n', 'search', 'orientationSuggestion'),
            i18nOrientations: ig(state, 'app', 'locale', 'i18n', 'orientation'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewSort: g(actions, 'setNewSort'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withState('snackbarIsOpen', 'setSnackbarIsOpen', true),
    withPropsOnChange(['data'], props => {
        const
            searchQueryQsKey = ig(props.routerContext, 'router', 'searchQuery', 'qsKey'),
            qs = queryString.parse(ig(props.routerContext, 'location', 'search')),
            i18nOrientationSuggestion = ! ig(props.data, 'orientationSuggestion') ? null :
                ig(props.i18nOrientations, getOrientationByClassId(
                    ig(props.data, 'orientationSuggestion'))
                )

        return {
            searchQuery: get(qs, [searchQueryQsKey], ''),
            i18nOrientationSuggestion,
        }
    }),
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        snackbarPosition: Object.freeze({
            vertical: 'top',
            horizontal: 'right'
        }),
        snackbarContentProps: Object.freeze({
            classes: Object.freeze({
                root: g(props, 'classes', 'snackbarContent'),
            })
        }),
    })),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        chooseSort: props => event => {
            event.preventDefault()
            props.setNewSort({
                newSortValue: event.target.value,
            })
        },

        closeSnackbar: props => event => {
            props.setSnackbarIsOpen(false)
        },

        runSearchLinkBuilder: props => () => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            {searchQuery: g(props, 'searchQuery')},
            ['searchQuery'],
            ! ig(props.data, 'orientationSuggestion') ? null :
                getOrientationByClassId(ig(props.data, 'orientationSuggestion')),
        ),

        controlLinkBuilder: props => qsParams => routerGetters.findVideos.link(
            g(props, 'routerContext'),
            qsParams,
            ['ordering', 'pagination', 'searchQuery']
        ),
    }),
    withPropsOnChange(['data'], props => {
        const
            buttonsArray = [
                <StyledLink
                    key="agree"
                    to={props.runSearchLinkBuilder()}
                    onClick={g(props, 'closeSnackbar')}
                >
                    <Button color="secondary" size="small">
                        {g(props, 'i18nYesButton')}
                    </Button>
                </StyledLink>,
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={g(props, 'closeSnackbar')}
                >
                    <CloseIcon />
                </IconButton>,
            ],
            snackbarText = g(props, 'i18nOrientationSuggestionText')
                .replace('%SEARCH_QUERY%', g(props, 'searchQuery'))
                .replace('%ORIENTATION%', g(props, 'i18nOrientationSuggestion'))

        return {
            buttonsArray,
            snackbarText,
        }
    }),
    withPropsOnChange(['data', 'snackbarIsOpen'], props => ({
        complexSnackbarState: Boolean(ig(props.data, 'orientationSuggestion') &&
            g(props, 'snackbarIsOpen'))
    })),
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
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            typographyTitle: PropTypes.string,
            snackbarContent: PropTypes.string,
        }),
        isSSR: PropTypes.bool,
        data: model,
        htmlLang: PropTypes.string,
        routerContext: routerContextModel,
        snackbarIsOpen: PropTypes.bool,
        i18nYesButton: PropTypes.string,
        i18nOrientationSuggestionText: PropTypes.string,
        i18nOrientations: legacyOrientationPrefixesModel,
        searchQuery: PropTypes.string,
        i18nOrientationSuggestion: PropTypes.nullable(PropTypes.string),
        snackbarPosition: PropTypes.exact({
            vertical: PropTypes.string,
            horizontal: PropTypes.string,
        }),
        snackbarContentProps: PropTypes.exact({
            classes: PropTypes.exact({
                root: PropTypes.string,
            }),
        }),
        snackbarText: PropTypes.string,
        buttonsArray: PropTypes.arrayOf(PropTypes.node),
        complexSnackbarState: PropTypes.bool,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewSort: PropTypes.func,
        chooseSort: PropTypes.func,
        setNewText: PropTypes.func,
        controlLinkBuilder: PropTypes.func,
        runSearchLinkBuilder: PropTypes.func,
        setSnackbarIsOpen: PropTypes.func,
    }),
    loadingWrapper({
        withControlBar: true,
        withMoviesList: true,
        videoListRandomWidthForPage: FIND_VIDEOS,
    })
)(FindVideos)
