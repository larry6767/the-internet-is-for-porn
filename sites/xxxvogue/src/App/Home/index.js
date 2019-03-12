import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withPropsOnChange, onlyUpdateForKeys} from 'recompose'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

import ListComponent from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import {
    getHeaderWithOrientation,
    withStylesProps,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    getHeaderText,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    areWeSwitchedOnPage,
    lazyImage,
} from '../helpers'

import {immutableI18nOrderingModel, routerContextModel} from '../models'
import {model} from './models'
import routerGetters from '../routerGetters'
import PageTextHelmet from '../../generic/PageTextHelmet'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import loadingWrapper from '../../generic/loadingWrapper'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'
import headerActions from '../MainHeader/actions'

import {PageWrapper, LetterIcon, NichesList, Niche, NicheImage, StyledLink} from './assets'

const
    renderListItemLink = (x, idx, arr, classedBounds, routerContext) => <StyledLink
        to={routerGetters.pornstar.link(routerContext, ig(x, 'subPage'), null)}
        key={ig(x, 'id')}
    >
        <ListItem button classes={g(classedBounds, 'listItem')}>
            <ListItemIcon>
                {idx !== 0 && ig(x, 'letter') === ig(arr, [(idx - 1), 'letter'])
                    ? <PermIdentityIcon></PermIdentityIcon>
                    : <LetterIcon>{ig(x, 'letter')}</LetterIcon>}

            </ListItemIcon>
            <ListItemText
                classes={g(classedBounds, 'listItemText')}
                primary={ig(x, 'name')}
                secondary={ig(x, 'itemsCount')}
            />
        </ListItem>
    </StyledLink>,

    NicheWrapper = compose(
        lazyImage,
        onlyUpdateForKeys(['x', 'previewStyle'])
    )((props) => <Niche>
        <StyledLink
            to={routerGetters.niche.link(
                g(props, 'routerContext'),
                ig(props.x, 'subPage'),
                null
            )}
            key={ig(props.x, 'id')}
        >
            <NicheImage ref={g(props, 'setRef')} style={g(props, 'previewStyle')}/>
            <Typography
                variant="body1"
                gutterBottom
                classes={g(props, 'classedBounds', 'nicheTitleTypography')}
            >{ig(props.x, 'name')}</Typography>
        </StyledLink>
    </Niche>),

    Home = ({
        classedBounds, data, routerContext,
        htmlLang, i18nNichesHeader, i18nPornstarsHeader,
    }) => <Fragment>
        <PageTextHelmet htmlLang={htmlLang} pageText={ig(data, 'pageText')}/>
        <PageWrapper>
            <Typography variant="h4" gutterBottom>
                {i18nNichesHeader}
            </Typography>
            <NichesList>
                {ig(data, 'nichesList').map(x => <NicheWrapper
                    key={ig(x, 'id')}
                    x={x}
                    classedBounds={classedBounds}
                    routerContext={routerContext}
                />)}
            </NichesList>
            <Typography variant="h4" gutterBottom>
                {i18nPornstarsHeader}
            </Typography>
            <ListComponent component="div" classes={g(classedBounds, 'listComponent')}>
                {ig(data, 'pornstarsList').map((x, idx) => renderListItemLink(
                    x,
                    idx,
                    ig(data, 'pornstarsList'),
                    classedBounds,
                    routerContext
                ))}
            </ListComponent>
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
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: ig(state, 'app', 'home'),
            routerContext: getRouterContext(state),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nNichesHeader: getHeaderWithOrientation(state, 'niches'),
            i18nPornstarsHeader: getHeaderWithOrientation(state, 'pornstars'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    onlyUpdateForKeys(['data', 'cb']),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),
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
    withStylesProps(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            listComponent: Object.freeze({root: g(props, 'classes', 'listComponentRoot')}),
            listItem: Object.freeze({gutters: g(props, 'classes', 'itemGutters')}),
            listItemText: Object.freeze({
                root: g(props, 'classes', 'listItemTextRoot'),
                primary: g(props, 'classes', 'primaryTypography'),
                secondary: g(props, 'classes', 'secondaryTypography'),
            }),
            nicheTitleTypography: Object.freeze({root: g(props, 'classes', 'nicheTitleTypography')}),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            listComponentRoot: PropTypes.string,
            itemGutters: PropTypes.string,
            listItemTextRoot: PropTypes.string,
            primaryTypography: PropTypes.string,
            secondaryTypography: PropTypes.string,
            nicheTitleTypography: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            listComponent: PropTypes.object,
            listItem: PropTypes.object,
            listItemText: PropTypes.object,
            nicheTitleTypography: PropTypes.object,
        }),

        cb: PropTypes.string,
        data: model,
        routerContext: routerContextModel,
        htmlLang: PropTypes.string,
        i18nOrdering: immutableI18nOrderingModel,
        i18nNichesHeader: PropTypes.string,
        i18nPornstarsHeader: PropTypes.string,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
    }),
    loadingWrapper({
        isHome: true,
    })
)(Home)
